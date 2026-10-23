import { Project } from './types';

import imageBrideGroomStories from './assets/images/Bride & Groom Stories/title_image.jpg';
import imageYourStageArtist from './assets/images/Your Stage/title_image.jpg';
import imageJoburgFamily from './assets/images/Family Moments/title_image.jpg';
import imageJoburgLifestyle from './assets/images/Lifestyle/title_image.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'bride-and-groom-exhibit',
    title: 'Bride & Groom Stories',
    category: 'BRIDE & GROOM STORIES',
    year: '2026',
    image: imageBrideGroomStories,
    description: "The big moments, the quiet glances and everything in between. I’ll capture your day as it unfolds, preserving the emotion, laughter and details you’ll want to revisit for years to come.",
    layoutType: 'overlapping',
    museumNumber: 'CATEGORY 01',
    location: 'Cathedral Courtyard • Architectural Editorial',
    credits: 'Creative Direction & Photography: Angelique-Mari',
    medium: 'Medium Format Film • Cathedral Stone & Golden Sunlight',
    aspectRatio: '16/9'
  },
  {
    id: 'your-stage-exhibit',
    title: 'Your Stage',
    category: 'YOUR STAGE',
    year: '2026',
    image: imageYourStageArtist,
    description: "The creative spotlight, raw artistry, and creators commanding their craft. Presence, tactile expression, and authentic vision brought into sharp focus.",
    layoutType: 'asymmetric-left',
    museumNumber: 'CATEGORY 02',
    location: 'Art Loft & Studio • Johannesburg',
    credits: 'Creative Direction & Photography: Angelique-Mari',
    medium: '35mm Film & Natural Daylight • Visual Artist Series',
    aspectRatio: '3/4'
  },
  {
    id: 'family-moments-exhibit',
    title: 'Family Moments',
    category: 'FAMILY MOMENTS',
    year: '2026',
    image: imageJoburgFamily,
    description: "The little moments, the biggest memories. From tiny toes and cheeky smiles to the beautiful chaos of family life, I capture the genuine connections and precious details you’ll treasure for years to come.",
    layoutType: 'asymmetric-right',
    museumNumber: 'CATEGORY 03',
    location: 'Westcliff • Johannesburg Lofts',
    credits: 'Photography: Angelique-Mari',
    medium: 'Natural Daylight Lofts • Organic Emotive Textures',
    aspectRatio: '4/3'
  },
  {
    id: 'lifestyle-exhibit',
    title: 'Lifestyle',
    category: 'LIFESTYLE',
    year: '2026',
    image: imageJoburgLifestyle,
    description: "Beautiful spaces, unforgettable destinations and the finer details of life. From luxury cars and elegant interiors to breathtaking getaways and exceptional hospitality, I create captivating imagery that brings your brand, space or experience to life.",
    layoutType: 'full',
    museumNumber: 'CATEGORY 04',
    location: 'Maboneng Precinct & Cultural Spaces • South Africa',
    credits: 'Spatial Curation & Photography: Angelique-Mari',
    medium: '35mm Fine Grain • Architectural Daylight',
    aspectRatio: '21/9'
  }
];
