export interface IFilter {
  id: number;
  name: string;
  visibility_type: 'MAIN' | 'ADDITIONAL';
  type: 'NUMERIC_RANGE' | 'LISTED';
  meta: {
    min?: number;
    max?: number;
    items?: string[];
  };
}

export interface IFilterFront {
  id: number;
  name: string;
  type: 'NUMERIC_RANGE' | 'LISTED';
  values: any[];
}
