import type { Image, ImageVariants } from '../../src/models/IImage';

const getImageVariantByFieldname = (image: Image, fieldname: string) => {
  try {
    const imageVariant = image.variants[fieldname];

    return imageVariant;
  } catch (error) { }

  return null;
};

const getImageVariantProps = (variants: ImageVariants, fieldname: string) => {
  return {
    src: variants[fieldname + '_webp']?.url || variants[fieldname]?.url || variants.original?.url,
    width: variants[fieldname + '_webp']?.meta.width || variants[fieldname]?.meta.width || variants.original?.meta.width,
    height: variants[fieldname + '_webp']?.meta.height || variants[fieldname]?.meta.height || variants.original?.meta.height,
    unoptimized: true,
  };
};

export { getImageVariantByFieldname, getImageVariantProps };
