
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { sendChatMessage } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

// Audio Utilities as per @google/genai guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Limitless Rythymm! Are you looking for dance classes, or do you have an event you'd like us to choreograph for?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAiTalking, setIsAiTalking] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContexts = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const transcriptionRef = useRef<{ input: string; output: string }>({ input: '', output: '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiTalking]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const newMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const history = newMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendChatMessage(history, text);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const stopLiveSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsLiveMode(false);
    setIsAiTalking(false);
  };

  const startLiveSession = async () => {
    try {
      setIsLiveMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContexts.current = { input: inCtx, output: outCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inCtx.createMediaStreamSource(stream);
            const scriptProcessor = inCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcriptions
            if (message.serverContent?.outputTranscription) {
              transcriptionRef.current.output += message.serverContent.outputTranscription.text;
              setIsAiTalking(true);
            } else if (message.serverContent?.inputTranscription) {
              transcriptionRef.current.input += message.serverContent.inputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              const userText = transcriptionRef.current.input;
              const modelText = transcriptionRef.current.output;
              if (userText || modelText) {
                setMessages(prev => [
                  ...(userText ? [{ role: 'user' as const, text: userText }] : []),
                  ...(modelText ? [{ role: 'model' as const, text: modelText }] : [])
                ]);
              }
              transcriptionRef.current = { input: '', output: '' };
              setIsAiTalking(false);
            }

            // Handle Audio Playback
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outCtx) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              setIsAiTalking(true);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsAiTalking(false);
            }
          },
          onclose: () => setIsLiveMode(false),
          onerror: (e) => console.error("Live Error:", e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are the LR Pulse AI. Be helpful, concise, and energetic about dance. If the user asks for a class, recommend one of our style masters.',
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start live session:", err);
      setIsLiveMode(false);
    }
  };

  const QUICK_ACTIONS = [
    "Academy Classes",
    "Event Choreography",
    "Wedding Magic",
    "Meet Faculty"
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-[0_15px_30px_rgba(65,105,225,0.4)] flex items-center justify-center z-[70] hover:scale-110 active:scale-90 transition-all border-2 border-white/20"
      >
        <div className="w-8 h-8">
            <img src="https://i.ibb.co/GfkQ5MpP/image.png" className="w-full h-full object-contain brightness-0 invert" alt="Logo" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background-dark animate-pulse"></div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
            if (isLiveMode) stopLiveSession();
            setIsOpen(false);
          }}></div>
          
          <div className="relative w-full max-w-[400px] mx-auto h-[75vh] bg-surface-dark border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="p-6 bg-primary/10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg overflow-hidden p-1.5 transition-all ${isAiTalking ? 'scale-110 ring-4 ring-primary/30' : ''}`}>
                    <img src="https://i.ibb.co/GfkQ5MpP/image.png" className="w-full h-full object-contain brightness-0 invert" alt="LR AI" />
                  </div>
                  {isAiTalking && (
                    <div className="absolute -inset-2 rounded-full border border-primary animate-ping opacity-40"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">LR Pulse</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{isLiveMode ? 'Live Conversation' : 'Online Now'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={isLiveMode ? stopLiveSession : startLiveSession}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isLiveMode ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-400 hover:text-primary'}`}
                >
                  <span className="material-icons-round">{isLiveMode ? 'mic_off' : 'mic'}</span>
                </button>
                <button onClick={() => {
                  if (isLiveMode) stopLiveSession();
                  setIsOpen(false);
                }} className="w-10 h-10 rounded-xl bg-white/5 text-slate-500 hover:text-white flex items-center justify-center">
                  <span className="material-icons-round">close</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-lg' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* Live Audio Transcription Placeholder */}
              {isLiveMode && (transcriptionRef.current.input || transcriptionRef.current.output) && (
                <div className="animate-pulse">
                  {transcriptionRef.current.input && (
                    <div className="flex justify-end mb-2">
                       <div className="bg-primary/40 text-white/80 p-3 rounded-2xl rounded-tr-none text-xs italic">
                         {transcriptionRef.current.input}...
                       </div>
                    </div>
                  )}
                  {transcriptionRef.current.output && (
                    <div className="flex justify-start">
                       <div className="bg-white/10 text-slate-400 p-3 rounded-2xl rounded-tl-none text-xs italic">
                         {transcriptionRef.current.output}...
                       </div>
                    </div>
                  )}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none animate-pulse flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Waveform/Visualizer Overlay for Live Mode */}
            {isLiveMode && (
               <div className="absolute bottom-24 left-0 right-0 px-8 pointer-events-none">
                  <div className="flex items-center justify-center gap-1 h-8">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 bg-primary rounded-full transition-all duration-150 ${isAiTalking ? 'animate-bounce' : 'h-1'}`}
                        style={{ 
                          height: isAiTalking ? `${Math.random() * 100}%` : '4px',
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
               </div>
            )}

            {/* Quick Actions Footer */}
            {!isLiveMode && (
              <div className="px-6 py-2">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  {QUICK_ACTIONS.map(action => (
                    <button 
                      key={action}
                      onClick={() => handleSend(action)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 pt-2">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  disabled={isLiveMode}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder={isLiveMode ? "Listening to your pulse..." : "Tell us what you're looking for..."}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-primary transition-colors text-white ${isLiveMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {!isLiveMode && (
                  <button 
                    onClick={() => handleSend(input)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
                  >
                    <span className="material-icons-round">send</span>
                  </button>
                )}
                {isLiveMode && (
                   <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
