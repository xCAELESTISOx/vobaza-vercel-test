export interface IFilter {
  id: number;
  name: string;
  value_type: 'NUMBER' | 'PRICE' | 'STRING';
  visibility_type: 'MAIN' | 'ADDITIONAL';
  display_type: 'NUMERIC_RANGE' | 'MANY_FROM_MANY';
  meta: {
    min?: number;
    max?: number;
    items?: string[];
  };
  display_name?: string;
}

export interface IFilterMeta {
  h1: string;
  title: string;
  description: string;
  keywords: string;
}

export interface IFilterFront {
  id: number;
  name: string;
  tag_slug?: string;
  value_type?: 'NUMBER' | 'PRICE' | 'STRING';
  type: 'NUMERIC_RANGE' | 'LISTED';
  values: any[];
  display_name?: string;
}
