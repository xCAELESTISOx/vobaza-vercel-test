import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import type { IGoodCompare } from 'entities/products/model/IGood';
import type { IAttributeCompare } from 'src/models/IAttributes';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { removeCompare, setCompare } from 'src/store/goods';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import CompareListRemoveFeatures from './RemovedFeatures';
import CompareListTable from './Table';
import CompareListItem from './Item';

import styles from './styles.module.scss';
import { api } from 'app/api';

type Props = {
  initialGoods: IGoodCompare[];
  initialAttributes: IAttributeCompare[];
};

const CompareList: FC<Props> = ({ initialGoods, initialAttributes }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [goods, setGoods] = useState(initialGoods);
  const [attributes, setAttributes] = useState(initialAttributes);
  const [currentAttributes, setCurrentAttributes] = useState(initialAttributes);
  const [differentAttributesId, setDifferentAttributesId] = useState<number[]>(null);
  const [tab, setTab] = useState('ALL');
  const [removedAttributes, setRemovedAttributes] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const goShopping = () => {
    router.push('/');
  };
  const clearList = () => {
    if (isLoading) return;
    setIsLoading(true);
    const token = Cookies.get('token');
    if (token) {
      try {
        api.removeAuthCompareList();
      } catch (error) {
        console.error(error);
      }
    }
    dispatch(setCompare([]));
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
        console.error(error);
      }
    }
    dispatch(removeCompare(deletedGood.id));
    router.replace(router.asPath, null, { scroll: false });
  };

  const setCurrentAttributesHandler = () => {
    switch (tab) {
      case 'SAME': {
        setCurrentAttributes(attributes.filter((attribute) => !differentAttributesId.includes(+attribute.id)));
        break;
      }
      case 'DIFFERENT': {
        setCurrentAttributes(attributes.filter((attribute) => differentAttributesId.includes(+attribute.id)));
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
                  value[0].code !== good.attributes_value[attribute.id][0].code ||
                  value[0].value !== good.attributes_value[attribute.id][0].value
                ) {
                  return true;
                }
              } else if (attribute.data_type === 'MANY_FROM_MANY') {
                if (value.length !== good.attributes_value[attribute.id].length) {
                  return true;
                } else {
                  for (const key in value) {
                    if (value[key] !== good.attributes_value[attribute.id][key]) {
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
    setRemovedAttributes(removedAttributes.filter((feature) => !values.includes(feature)));
  };
  const checkRemovedAttributes = () => {
    setRemovedAttributes(removedAttributes.filter((attribute) => attributes.find((item) => attribute.id === item.id)));
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
        {goods?.length > 0 ? (
          <>
            <div className={styles.compareListContent}>
              <div className={styles.compareListMenu}>
                <button
                  className={`${styles.compareListMenuItem} ${tab === 'ALL' && styles.active}`}
                  data-tab="ALL"
                  onClick={setTabHandler}
                >
                  ?????? ????????????????????????????
                </button>
                <button
                  className={`${styles.compareListMenuItem} ${tab === 'SAME' && styles.active}`}
                  data-tab="SAME"
                  onClick={setTabHandler}
                >
                  ???????????? ??????????????
                </button>
                <button
                  className={`${styles.compareListMenuItem} ${tab === 'DIFFERENT' && styles.active}`}
                  data-tab="DIFFERENT"
                  onClick={setTabHandler}
                >
                  ???????????? ??????????????????
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
          <div className={styles.compareEmptyList}>???????????? ???? ??????????????</div>
        )}
      </div>
      <div className={styles.compareButtons}>
        <Button text="???????????????????? ??????????????" onClick={goShopping} size="big" />
        {Boolean(goods?.length) && <Button variation="ternary" text="???????????????? ????????????" onClick={clearList} size="big" />}
      </div>
      {removedAttributes.length > 0 && (
        <CompareListRemoveFeatures addAttribute={addAttribute} removedAttributes={removedAttributes} />
      )}
    </>
  );
};
export default CompareList;
