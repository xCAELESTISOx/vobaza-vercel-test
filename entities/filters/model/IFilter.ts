export interface IFilter {
  id: number;
  name: string;
  value_type: 'NUMBER' | 'PRICE';
  visibility_type: 'MAIN' | 'ADDITIONAL';
  type: 'NUMERIC_RANGE' | 'LISTED';
  meta: {
    min?: number;
    max?: number;
    items?: string[];
  };
  display_name?: string
}

export interface IFilterFront {
  id: number;
  name: string;
  tag_slug?: string;
  value_type?: 'NUMBER' | 'PRICE' | 'STRING';
  type: 'NUMERIC_RANGE' | 'LISTED';
  values: any[];
  display_name?: string
}
