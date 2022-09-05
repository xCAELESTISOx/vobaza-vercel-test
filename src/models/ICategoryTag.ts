import { ITagFitlerFront } from './IFilter';

export interface ICategoryTag {
  id: number;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  keywords?: string;
  page_title?: string;
  filter: ITagFitlerFront;
  tags?: ICategoryTag[];
  type: 'FILTER' | 'REDIRECT';
  redirect_url?: string
}
