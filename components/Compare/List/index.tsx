import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import CompareListItem from './Item';
import CompareListTable from './Table';
import CompareListRemoveFeatures from './RemovedFeatures';

const itemCount = 3;
const tmpFetures = [
  {
    title: 'Модель',
    values: ['MOON FAMILY 1232'],
  },
  {
    title: 'Вес (кг)',
    values: ['121 '],
  },
  {
    title: 'Материал каркаса ',
    values: ['ЛДСП'],
    isBool: true,
  },
  {
    title: 'Наполнитель ',
    values: ['Высокоэластичный ППУ', 'Синтепон ', 'Ортопедические латы '],
    isBool: true,
  },
  {
    title: 'Ножки ',
    values: [''],
    isBool: true,
  },
  {
    title: 'Особенности ',
    values: [''],
  },
];

const CompareList: FC = () => {
  const [tmpHaveItems, setTmpHaveItems] = useState(1);
  const [removedFeatures, setRemovedFeatures] = useState([]);
  const router = useRouter();

  const goShopping = () => {
    router.push('/');
  };
  const clearList = () => {
    router.push('/');
  };

  const tmpRemoveFeature = (value) => {
    setRemovedFeatures([...removedFeatures, value]);
  };
  const tmpAddFeatures = (values) => {
    setRemovedFeatures(
      removedFeatures.filter((feature) => !values.includes(feature))
    );
  };

  return (
    <>
      <div className={styles.compareList}>
        {tmpHaveItems ? (
          <>
            <div className={styles.compareListContent}>
              <div className={styles.compareListMenu}>
                <button
                  className={`${styles.compareListMenuItem} ${
                    tmpHaveItems === 1 && styles.active
                  }`}
                  onClick={() => setTmpHaveItems(1)}
                >
                  Все характеристики
                </button>
                <button
                  className={`${styles.compareListMenuItem} ${
                    tmpHaveItems === 2 && styles.active
                  }`}
                  onClick={() => setTmpHaveItems(2)}
                >
                  Только похожие
                </button>
                <button
                  className={styles.compareListMenuItem}
                  onClick={() => setTmpHaveItems(0)}
                >
                  Только различные
                </button>
              </div>
              {[...Array(itemCount)].map((item) => (
                <div key={item} className={styles.compareListItemBlock}>
                  <CompareListItem />
                </div>
              ))}
            </div>
            <CompareListTable
              removedFeatures={removedFeatures}
              removeFeature={tmpRemoveFeature}
              features={tmpFetures}
              items={itemCount}
            />
          </>
        ) : (
          <>
            <div className={styles.compareEmptyList}>Товары не выбраны</div>
          </>
        )}
      </div>
      <div className={styles.compareButtons}>
        <Button
          style={{
            color: '#af1ebe',
            backgroundColor: '#f2f2f2',
            fontWeight: 500,
          }}
          text="Продолжить покупки"
          onClick={goShopping}
        />
        {!!tmpHaveItems && (
          <Button
            style={{
              color: '#fff',
              backgroundColor: '#f2f2f2',
              fontWeight: 500,
            }}
            text="Очистить список"
            onClick={clearList}
          />
        )}
      </div>
      {removedFeatures.length > 0 && (
        <CompareListRemoveFeatures
          addFeatures={tmpAddFeatures}
          removedFeatures={removedFeatures}
        />
      )}
    </>
  );
};
export default CompareList;
