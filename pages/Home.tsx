
import React from 'react';
import Hero from '../components/Hero';
import ShowsSection from '../components/ShowsSection';
import DancerSpotlight from '../components/DancerSpotlight';
import LatestNews from '../components/LatestNews';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <ShowsSection />
      <DancerSpotlight />
      <LatestNews />
    </div>
  );
};

export default Home;
