import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import type { ITarget } from 'components/UI/RadioTabsGroup';
import type { ICartGood } from 'components/Cart/ListItem';

import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { RadioTabsGroup } from 'components/UI/RadioTabsGroup';
import Toggle from 'components/UI/Toggle';

import styles from './styles.module.scss';

type Props = {
  assemblyPrice: number;
  goods: ICartGood[];
  setFieldValue: (name: string, value: any) => void;
};

const tabsVariants = [
  { code: 'FULL', value: 'Весь заказ' },
  { code: 'PARTIAL', value: 'Выбранные товары' },
];

const filterProducts = (goods: ICartGood[]) => {
  const newProducts = [];
  goods.forEach(({ product, quantity }) => {
    [...Array.from({ length: quantity })].forEach((_, index) =>
      newProducts.push({
        ...product,
        position_id: product.id + ' ' + index,
        assembly: true,
        ...(quantity > 1 && { name: product.name + ' - #' + (index + 1) }),
      })
    );
  });

  return newProducts;
};

const DeliveryAssembly = ({ assemblyPrice, goods, setFieldValue }: Props) => {
  const [assemblyType, setAssemblyType] = useState<'FULL' | 'PARTIAL'>('FULL');
  const [isAssembly, setIsAssembly] = useState(false);
  const [productsList, setProductsList] = useState(filterProducts(goods));

  const toggleIsAssembly = () => {
    // Ресет значений

    if (!isAssembly) {
      setAssemblyType('FULL');
      setFieldValue('assembly', { full_order: true });
    } else {
      setFieldValue('assembly', null);
    }

    setIsAssembly(!isAssembly);
  };

  const onAssemblyTypeChange = (event: ITarget) => {
    const { code } = event.target.value;
    setAssemblyType(code as 'FULL' | 'PARTIAL');

    if (code === 'FULL') {
      setFieldValue('assembly', { full_order: true });
    } else {
      const newProductIds = productsList.filter(({ assembly }) => assembly).map(({ id }) => id);
      setFieldValue('assembly', { product_ids: newProductIds });
    }
  };

  const onAssemblyProductChange = (val: boolean, index: number) => {
    const newProductsList = [...productsList];
    newProductsList[index] = { ...newProductsList[index], assembly: val };

    setProductsList(newProductsList);
  };

  useEffect(() => {
    // Обновляем список товаров в сборке при изменении локального списка
    const newProductIds = productsList.filter(({ assembly }) => assembly).map(({ id }) => id);

    isAssembly && setFieldValue('assembly', { product_ids: newProductIds });
  }, [productsList]);

  return (
    <div className={styles.orderDeliverySubblockToggleBlock}>
      <Toggle isActive={isAssembly} onClick={toggleIsAssembly}>
        <div className={styles.orderDeliverySubblockToggle}>
          Сборка{' '}
          {assemblyPrice && isAssembly ? (
            <>
              –&nbsp;<span>{assemblyPrice} ₽</span>
            </>
          ) : null}
        </div>
      </Toggle>
      {isAssembly && (
        <div className={styles.orderAssemblyContent}>
          <div className={styles.orderAssemblyItem}>
            <RadioTabsGroup
              value={{ code: assemblyType }}
              options={tabsVariants}
              name="assemblyType"
              onChange={onAssemblyTypeChange}
            />
          </div>
          {assemblyType === 'PARTIAL' && (
            <div className={styles.orderAssemblyItem}>
              {productsList.map((item, index) => (
                <div className={styles.orderAssemblyProduct} key={item.position_id}>
                  <InputCheckbox
                    variation="secondary"
                    label=""
                    initialValue={item.assembly}
                    onChange={(val) => onAssemblyProductChange(val, index)}
                  />
                  <div className={styles.orderAssemblyProductContent}>
                    <Image src={item.main_image.variants.small.url} height="48" width="48" alt={item.name} />
                    <h4 className={styles.orderAssemblyProductName}>{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryAssembly;
