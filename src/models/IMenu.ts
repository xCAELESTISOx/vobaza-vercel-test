export interface IMenuItem {
  id: number;
  item_type: 'NORMAL' | 'CATEGORY';
  parent_id?: number;
  name: string;
  is_sticky?: boolean;
  /** Полее имеется только когда item_type === NORMAL, может быть пустым */
  link?: string;
  /** Ссылка на изображение */
  icon?: string;
  /** Полее имеется только когда item_type === CATEGORY */
  category?: {
    id: number;
    slug: number;
    name: string;
    ancestors?: { id: number; slug: number; name: string }[];
  };
  children: IMenuItem[];
}
