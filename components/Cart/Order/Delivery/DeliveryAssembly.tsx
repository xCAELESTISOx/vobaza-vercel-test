import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import type { ITarget } from 'components/UI/RadioTabsGroup';
import type { ICartGood } from 'components/Cart/ListItem';
import type { IOrderAddress } from 'src/models/IOrder';
import type { IAssemblyPrice } from 'src/models/IDelivery';
import useDebounce from 'src/hooks/useDebounce';

import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { RadioTabsGroup } from 'components/UI/RadioTabsGroup';
import Toggle from 'components/UI/Toggle';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';
import { api } from 'assets/api';

const ASSEMBLY_PRICE_ERROR = 'Временно невозможно посчитать стоимость сборки';

const tabsVariants = [
  { code: 'FULL', value: 'Весь заказ' },
  { code: 'PARTIAL', value: 'Выбранные товары' },
];

const filterProducts = (goods: ICartGood[]) => {
  const newProducts = [];
  goods.forEach(({ product, quantity }) => {
    [...Array.from({ length: quantity })].forEach((_, index) => {
      if (product.assembly === 'PROFESSIONAL' || product.assembly === 'SIMPLY')
        newProducts.push({
          ...product,
          assembly: true,
          position_id: product.id + ' ' + index,
          ...(quantity > 1 && { name: product.name + ' - #' + (index + 1) }),
        });
    });
  });

  return newProducts;
};

type Props = {
  assemblyPrice: IAssemblyPrice;
  goods: ICartGood[];
  address: IOrderAddress;
  setFieldValue: (name: string, value: any) => void;
  setAssemblyPrice: (value: IAssemblyPrice) => void;
};

const DeliveryAssembly = ({ address, assemblyPrice, goods, setFieldValue, setAssemblyPrice }: Props) => {
  const [assemblyType, setAssemblyType] = useState<'FULL' | 'PARTIAL'>('FULL');
  const [isAssembly, setIsAssembly] = useState(false);
  const [productsList, setProductsList] = useState(filterProducts(goods));

  const getAssemblyPrice = async () => {
    const newProductIds = productsList.filter(({ assembly }) => assembly).map(({ id }) => id);

    if (!isAssembly || !newProductIds.length) return null;
    try {
      const res = await api.getAssemblyPrice(address?.address, newProductIds);

      return res.data?.data?.price / 100 || 0;
    } catch (error) {
      console.error(error);
      return ASSEMBLY_PRICE_ERROR;
    }
  };

  const checkAssemblyPrice = async () => {
    if (!isAssembly) {
      setAssemblyPrice(null);
    } else {
      const price = await getAssemblyPrice();
      setAssemblyPrice(price);
    }
  };
  const debouncedCheckAssemblyPrice = useDebounce(checkAssemblyPrice, 800);

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

  useEffect(() => {
    if (!isAssembly) {
      setAssemblyPrice(null);
    } else {
      debouncedCheckAssemblyPrice();
    }
  }, [address?.address, isAssembly, productsList]);

  return (
    <div className={styles.orderDeliverySubblockToggleBlock}>
      <Toggle isActive={isAssembly} onClick={toggleIsAssembly}>
        <div className={styles.orderDeliverySubblockToggle}>
          Сборка{' '}
          {assemblyPrice === ASSEMBLY_PRICE_ERROR ? (
            <>
              &nbsp;<span style={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>{assemblyPrice}</span>
            </>
          ) : assemblyPrice !== null && isAssembly ? (
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
                    <div style={{ maxWidth: '48px', maxHeight: '48px' }}>
                      {item?.main_image?.variants ? (
                        <Image
                          src={item.main_image.variants.small.url}
                          objectFit="contain"
                          height="100%"
                          width="100%"
                          alt={item.name}
                        />
                      ) : (
                        <Image
                          src={PlaceholderImage}
                          objectFit="contain"
                          height="100%"
                          width="100%"
                          alt={item.name}
                          unoptimized
                        />
                      )}
                    </div>

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
