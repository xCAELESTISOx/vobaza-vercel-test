import { FC, useEffect, useState } from 'react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from 'pages/product/[slug]/styles.module.scss';
import { useGoods } from 'src/context/goods';
import { api } from 'assets/api';
import Cookies from 'js-cookie';

type Props = {
  id: number;
};

const ProductCompare: FC<Props> = ({ id }) => {
  const { dispatch, state } = useGoods();
  const { compareIds } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [currentCompare, setCurrentCompare] = useState(false);

  const toggleCompare = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const token = Cookies.get('token');
    if (currentCompare) {
      if (token) {
        try {
          await api.removeFromAuthCompareList(id);
        } catch (error) {
          console.log(error);
        }
      }
      dispatch({ type: 'removeCompare', payload: id });
    } else {
      if (token) {
        try {
          await api.addToAuthCompareList(id);
        } catch (error) {
          console.log(error);
        }
      }
      dispatch({ type: 'addCompare', payload: id });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (compareIds && compareIds.includes(id)) {
      setCurrentCompare(true);
    } else {
      setCurrentCompare(false);
    }
  }, [compareIds, id]);

  return (
    <button
      className={`${styles.leftMenuActionBtn} ${
        currentCompare ? styles.active : ''
      }`}
      onClick={toggleCompare}
    >
      <Icon name="Compare" />{' '}
      <span>{currentCompare ? 'В сравнении' : 'Сравнить'}</span>
    </button>
  );
};

export { ProductCompare };
