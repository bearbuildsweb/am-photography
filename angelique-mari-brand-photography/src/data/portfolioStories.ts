// Story sub-directories for each portfolio category
// Category 1: Bride & Groom Stories
import bg1_1 from '../assets/images/Bride & Groom Stories/1/1.jpg';
import bg1_2 from '../assets/images/Bride & Groom Stories/1/2.jpg';
import bg2_1 from '../assets/images/Bride & Groom Stories/2/1.jpg';
import bg2_2 from '../assets/images/Bride & Groom Stories/2/2.jpg';
import bg3_1 from '../assets/images/Bride & Groom Stories/3/1.jpg';
import bg3_2 from '../assets/images/Bride & Groom Stories/3/2.jpg';

// Category 2: Your Stage
import ys1_1 from '../assets/images/Your Stage/1/1.jpg';
import ys1_2 from '../assets/images/Your Stage/1/2.jpg';
import ys2_1 from '../assets/images/Your Stage/2/1.jpg';
import ys2_2 from '../assets/images/Your Stage/2/2.jpg';
import ys3_1 from '../assets/images/Your Stage/3/1.jpg';
import ys3_2 from '../assets/images/Your Stage/3/2.jpg';

// Category 3: Family Moments
import fm1_1 from '../assets/images/Family Moments/1/1.jpg';
import fm1_2 from '../assets/images/Family Moments/1/2.jpg';
import fm2_1 from '../assets/images/Family Moments/2/1.jpg';
import fm2_2 from '../assets/images/Family Moments/2/2.jpg';
import fm3_1 from '../assets/images/Family Moments/3/1.jpg';
import fm3_2 from '../assets/images/Family Moments/3/2.jpg';
import fm4_1 from '../assets/images/Family Moments/4/1.jpg';
import fm4_2 from '../assets/images/Family Moments/4/2.jpg';

// Category 4: Lifestyle
import ls1_1 from '../assets/images/Lifestyle/1/1.jpg';
import ls1_2 from '../assets/images/Lifestyle/1/2.jpg';
import ls2_1 from '../assets/images/Lifestyle/2/1.jpg';
import ls2_2 from '../assets/images/Lifestyle/2/2.jpg';
import ls3_1 from '../assets/images/Lifestyle/3/1.jpg';
import ls3_2 from '../assets/images/Lifestyle/3/2.jpg';
import ls4_1 from '../assets/images/Lifestyle/4/1.jpg';
import ls4_2 from '../assets/images/Lifestyle/4/2.jpg';

export interface Story {
  folderNumber: number;
  photo1: string;
  photo2: string;
}

export interface CategoryStories {
  categoryId: string;
  categoryTitle: string;
  stories: Story[];
}

export const CATEGORY_STORIES: CategoryStories[] = [
  // Index 0: Bride & Groom Stories
  {
    categoryId: 'bride-and-groom-stories',
    categoryTitle: 'Bride & Groom Stories',
    stories: [
      { folderNumber: 1, photo1: bg1_1, photo2: bg1_2 },
      { folderNumber: 2, photo1: bg2_1, photo2: bg2_2 },
      { folderNumber: 3, photo1: bg3_1, photo2: bg3_2 },
    ],
  },
  // Index 1: Your Stage
  {
    categoryId: 'your-stage',
    categoryTitle: 'Your Stage',
    stories: [
      { folderNumber: 1, photo1: ys1_1, photo2: ys1_2 },
      { folderNumber: 2, photo1: ys2_1, photo2: ys2_2 },
      { folderNumber: 3, photo1: ys3_1, photo2: ys3_2 },
    ],
  },
  // Index 2: Family Moments
  {
    categoryId: 'family-moments',
    categoryTitle: 'Family Moments',
    stories: [
      { folderNumber: 1, photo1: fm1_1, photo2: fm1_2 },
      { folderNumber: 2, photo1: fm2_1, photo2: fm2_2 },
      { folderNumber: 3, photo1: fm3_1, photo2: fm3_2 },
      { folderNumber: 4, photo1: fm4_1, photo2: fm4_2 },
    ],
  },
  // Index 3: Lifestyle
  {
    categoryId: 'lifestyle',
    categoryTitle: 'Lifestyle',
    stories: [
      { folderNumber: 1, photo1: ls1_1, photo2: ls1_2 },
      { folderNumber: 2, photo1: ls2_1, photo2: ls2_2 },
      { folderNumber: 3, photo1: ls3_1, photo2: ls3_2 },
      { folderNumber: 4, photo1: ls4_1, photo2: ls4_2 },
    ],
  },
];
