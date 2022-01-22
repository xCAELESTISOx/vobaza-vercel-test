import type { Image } from './IImage';

type BannerType = 'SLIDER' | 'MINIATURE';

interface Banner {
  id: number;
  name: string;
  type: BannerType;
  is_active: boolean;
  title: string;
  description: string;
  url: string;
  desktop_image: Image;
  mobile_image: Image;
  updated_at: string;
}

export type { Banner };
