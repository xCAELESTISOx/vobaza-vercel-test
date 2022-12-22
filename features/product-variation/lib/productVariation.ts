import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct, ProductVariantValue } from 'entities/products';

export type SelectVariationOption = (id: string | number, product: IVariantProduct) => void;

export type GetDropdownVariationItems = (
  option: IProductVariant<{ product: IVariantProduct; param: Variant }>,
  handelSelectOption: SelectVariationOption
) => Variant[];

export type GetImagesVariationItems = (
  currentOption: IProductVariant<{
    product: IVariantProduct;
    param: Variant<string | number, string>;
  }>,
  products: IVariantProduct[],
  variants: IProductVariant<Variant | ProductVariantValue>[],
  selectedOptions: Record<number, (string | number)[]>
) => (IVariantProduct & { tooltipText: string })[];
