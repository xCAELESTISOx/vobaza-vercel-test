import { ITagFitlerFront } from 'src/models/IFilter';

export interface ICategoryTag {
  id: number;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  keywords?: string;
  page_title?: string;
  filters: ITagFitlerFront[];
  tags?: ICategoryTag[];
  type: 'FILTER' | 'REDIRECT';
  redirect_url?: string;
  url: string;
}
