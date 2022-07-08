interface ImageVariant {
  id?: number;
  url: string;
  meta: {
    width: number;
    height: number;
  };
}
interface ImageVariants {
  [key: string]: ImageVariant;
}

interface Image {
  id: number;
  variants: ImageVariants;
}

export type { ImageVariant, ImageVariants, Image };
