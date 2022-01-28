import type { Image } from '../../src/models/IImage';

const getImageVariantByFieldname = (image: Image, fieldname: string) => {
  try {
    const imageVariant = image.variants[fieldname];

    return imageVariant;
  } catch (error) {}

  return null;
};

const getLastImageVariant = (image: Image) => {
  try {
    const imageVariant = Object.values(image.variants).pop();

    return imageVariant;
  } catch (error) {}

  return null;
};

export { getLastImageVariant, getImageVariantByFieldname };
