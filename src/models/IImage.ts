interface ImageVariant {
  url: string;
  meta: {
    width: number;
    height: number;
  };
}

interface Image {
  id: number;
  variants: {
    [key: string]: ImageVariant;
  };
}

export type { ImageVariant, Image };
