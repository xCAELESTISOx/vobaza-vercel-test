import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { removeCompare, addCompare } from 'src/store/goods';
import { useDispatch } from 'src/hooks/useDispatch';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from 'pages/product/[slug]/styles.module.scss';
import { api } from 'app/api';
import { useSelector } from 'src/hooks/useSelector';

type Props = {
  id: number;
};

const ProductCompare: FC<Props> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCompare, setCurrentCompare] = useState(false);

  const compareIds = useSelector((state) => state.goods.compareIds);
  const dispatch = useDispatch();

  const toggleCompare = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const token = Cookies.get('token');
    if (currentCompare) {
      if (token) {
        try {
          await api.removeFromAuthCompareList(id);
        } catch (error) {
          console.error(error);
        }
      }
      dispatch(removeCompare(id));
    } else {
      if (token) {
        try {
          await api.addToAuthCompareList(id);
        } catch (error) {
          console.error(error);
        }
      }
      dispatch(addCompare(id));
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
    <button className={`${styles.leftMenuActionBtn} ${currentCompare ? styles.active : ''}`} onClick={toggleCompare}>
      <Icon name="Compare" /> <span>{currentCompare ? 'В сравнении' : 'Сравнить'}</span>
    </button>
  );
};

export { ProductCompare };
