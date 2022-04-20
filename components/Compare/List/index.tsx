import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { IGoodCompare } from 'src/models/IGood';
import { IAttributeCompare } from 'src/models/IAttributes';
import { useGoods } from 'src/context/goods';
import { api } from 'assets/api';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import CompareListItem from './Item';
import CompareListTable from './Table';
import CompareListRemoveFeatures from './RemovedFeatures';

type Props = {
  initialGoods: IGoodCompare[];
  initialAttributes: IAttributeCompare[];
};

const CompareList: FC<Props> = ({ initialGoods, initialAttributes }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [goods, setGoods] = useState(initialGoods);
  const [attributes, setAttributes] = useState(initialAttributes);
  const [currentAttributes, setCurrentAttributes] = useState(initialAttributes);
  const [differentAttributesId, setDifferentAttributesId] =
    useState<number[]>(null);
  const [tab, setTab] = useState('ALL');
  const [removedAttributes, setRemovedAttributes] = useState([]);
  const { dispatch } = useGoods();
  const router = useRouter();

  const goShopping = () => {
    router.push('/');
  };
  const clearList = () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      api.removeAuthCompareList();
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'setCompare', payload: [] });
    router.push('/');
  };

  const deleteGood = async (deletedGood) => {
    if (isLoading) return;
    setIsLoading(true);

    const token = Cookies.get('token');
    if (token) {
      try {
        await api.removeFromAuthCompareList(deletedGood.id);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch({ type: 'removeCompare', payload: deletedGood.id });
    router.replace(router.asPath, null, { scroll: false });
  };

  const setCurrentAttributesHandler = () => {
    switch (tab) {
      case 'SAME': {
        setCurrentAttributes(
          attributes.filter(
            (attribute) => !differentAttributesId.includes(+attribute.id)
          )
        );
        break;
      }
      case 'DIFFERENT': {
        setCurrentAttributes(
          attributes.filter((attribute) =>
            differentAttributesId.includes(+attribute.id)
          )
        );
        break;
      }
      default: {
        setCurrentAttributes(attributes);
        break;
      }
    }
  };
  const getDifferentAttributes = () => {
    const ids = [];
    if (goods.length > 1) {
      attributes.forEach((attribute) => {
        let value = null;
        const isDifferent = goods.some((good) => {
          if (good.attributes_value[attribute.id]) {
            if (value) {
              if (attribute.data_type === 'COLOR') {
                if (
                  value[0].code !==
                    good.attributes_value[attribute.id][0].code ||
                  value[0].value !==
                    good.attributes_value[attribute.id][0].value
                ) {
                  return true;
                }
              } else if (attribute.data_type === 'MANY_FROM_MANY') {
                if (
                  value.length !== good.attributes_value[attribute.id].length
                ) {
                  return true;
                } else {
                  for (let key in value) {
                    if (
                      value[key] !== good.attributes_value[attribute.id][key]
                    ) {
                      return true;
                    }
                  }
                }
              } else if (value !== good.attributes_value[attribute.id]) {
                return true;
              }
            } else {
              value = good.attributes_value[attribute.id];
            }
          } else {
            return true;
          }
        });
        if (isDifferent) {
          ids.push(attribute.id);
        }
      });
    }
    setDifferentAttributesId(ids);
  };
  const setTabHandler = (e) => {
    setTab(e.target.dataset.tab || 'ALL');
  };

  const removeAttribute = (value) => {
    setRemovedAttributes([...removedAttributes, value]);
  };
  const addAttribute = (values) => {
    setRemovedAttributes(
      removedAttributes.filter((feature) => !values.includes(feature))
    );
  };
  const checkRemovedAttributes = () => {
    setRemovedAttributes(
      removedAttributes.filter((attribute) =>
        attributes.find((item) => attribute.id === item.id)
      )
    );
  };

  useEffect(() => {
    if (!differentAttributesId) {
      getDifferentAttributes();
    } else {
      setCurrentAttributesHandler();
    }
  }, [tab]);

  useEffect(() => {
    setCurrentAttributesHandler();
  }, [differentAttributesId]);

  useEffect(() => {
    if (differentAttributesId) {
      getDifferentAttributes();
    }
    if (removedAttributes) {
      checkRemovedAttributes();
    }
  }, [attributes]);

  useEffect(() => {
    setAttributes(initialAttributes);
  }, [initialAttributes]);
  useEffect(() => {
    setIsLoading(false);
    setGoods(initialGoods);
  }, [initialGoods]);

  return (
    <>
      <div className={styles.compareList}>
        {!!goods && goods.length > 0 ? (
          <>
            <div className={styles.compareListContent}>
              <div className={styles.compareListMenu}>
                <button
                  className={`${styles.compareListMenuItem} ${
                    tab === 'ALL' && styles.active
                  }`}
                  data-tab="ALL"
                  onClick={setTabHandler}
                >
                  Все характеристики
                </button>
                <button
                  className={`${styles.compareListMenuItem} ${
                    tab === 'SAME' && styles.active
                  }`}
                  data-tab="SAME"
                  onClick={setTabHandler}
                >
                  Только похожие
                </button>
                <button
                  className={`${styles.compareListMenuItem} ${
                    tab === 'DIFFERENT' && styles.active
                  }`}
                  data-tab="DIFFERENT"
                  onClick={setTabHandler}
                >
                  Только различные
                </button>
              </div>
              {goods.map((good) => (
                <div key={good.id} className={styles.compareListItemBlock}>
                  <CompareListItem good={good} deleteGood={deleteGood} />
                </div>
              ))}
            </div>
            <CompareListTable
              removedAttributes={removedAttributes}
              removeAttribute={removeAttribute}
              attributes={currentAttributes}
              goods={goods}
            />
          </>
        ) : (
          <div className={styles.compareEmptyList}>Товары не выбраны</div>
        )}
      </div>
      <div className={styles.compareButtons}>
        <Button text="Продолжить покупки" onClick={goShopping} size="big" />
        {!!goods && goods.length > 0 && (
          <Button
            variation="ternary"
            text="Очистить список"
            onClick={clearList}
            size="big"
          />
        )}
      </div>
      {removedAttributes.length > 0 && (
        <CompareListRemoveFeatures
          addAttribute={addAttribute}
          removedAttributes={removedAttributes}
        />
      )}
    </>
  );
};
export default CompareList;
