import type { Image, ImageVariants } from '../../src/models/IImage';

import PlaceholderImage from 'assets/images/placeholder.png';

const getImageVariantByFieldname = (image: Image, fieldname: string) => {
  try {
    const imageVariant = image.variants[fieldname];

    return imageVariant;
  } catch (error) {}

  return null;
};

const getImageVariantProps = (variants: ImageVariants, fieldname: string) => {
  return {
    src: variants
      ? variants[fieldname + '_webp']?.url || variants[fieldname]?.url || variants.original?.url
      : PlaceholderImage,
    width: variants
      ? variants[fieldname + '_webp']?.meta.width || variants[fieldname]?.meta.width || variants.original?.meta.width
      : undefined,
    height: variants
      ? variants[fieldname + '_webp']?.meta.height || variants[fieldname]?.meta.height || variants.original?.meta.height
      : undefined,
    unoptimized: true,
  };
};

export { getImageVariantByFieldname, getImageVariantProps };
