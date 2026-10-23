export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  layoutType: 'full' | 'asymmetric-left' | 'asymmetric-right' | 'overlapping';
  museumNumber: string;
  location?: string;
  credits?: string;
  aspectRatio?: string;
  medium?: string;
}

export type EmotionalReactionKey = 'disappointed' | 'underwhelmed' | 'satisfied' | 'okay' | 'impressed' | 'blown-away';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  year: string;
  rating?: number;
  emotionalReaction?: EmotionalReactionKey;
  emotionalLabel?: string;
  projectType?: string;
  date?: string;
}
