import type { Image } from './IImage';

export enum CollectionStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  HIDDEN = 'HIDDEN',
}

export enum CollectionSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface ICollection {
  id: number | string;
  name: string;
  status: keyof typeof CollectionStatus;
  size: keyof typeof CollectionSize;
  title?: string;
  description?: string;
  url: string;
  desktop_image?: Image;
  mobile_image?: Image;
}

export const CategoryStatusDictionary = {
  [CollectionStatus.ACTIVE]: 'Активна',
  [CollectionStatus.NOT_ACTIVE]: 'Неактивна',
  [CollectionStatus.HIDDEN]: 'Скрыта',
};
