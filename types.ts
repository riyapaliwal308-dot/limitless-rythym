
export interface Show {
  id: string;
  title: string;
  category: string;
  dates: string;
  priceFrom: number;
  imageUrl: string;
}

export interface Dancer {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface DanceClass {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  instructor: string;
  description: string;
  benefits: string[];
  requirements: string[];
  imageUrl: string;
}
