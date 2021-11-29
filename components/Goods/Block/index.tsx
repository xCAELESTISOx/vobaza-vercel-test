import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

import { Pagination } from '@nebo-team/vobaza.ui.pagination';
import GoodsList from '../List/index';
import Toggle from '../../UI/Toggle';
import GoodsFilters from '../Filters';

const GoodsBlock: FC = () => {
  const router = useRouter();
  const { page } = router.query as { [key: string]: string };
  const [isOnlyExpress, setIsOnlyExpress] = useState(true);

  const toggleIsOnlyExpress = () => {
    setIsOnlyExpress(!isOnlyExpress);
  };

  const replaceRouterQuery = (
    updateQuery: { [key: string]: string | number },
    exclude: Array<string> = []
  ) => {
    const prevQuery = { ...router.query };

    if (exclude) {
      exclude.forEach((el) => delete prevQuery[el]);
    }

    router.replace({
      query: {
        ...prevQuery,
        ...updateQuery,
      },
    });
  };
  const onChangePagination = (value: number) => {
    replaceRouterQuery({ page: value });
  };

  return (
    <div className={styles.goodsBlock}>
      <div className={styles.goodsExpress}>
        <Toggle isActive={isOnlyExpress} onClick={toggleIsOnlyExpress}>
          Экспресс-доставка
        </Toggle>
      </div>
      <div className={styles.filtersBlock}>
        <GoodsFilters />
      </div>
      <div className={styles.goodsList}>
        <GoodsList goods={[...Array(40)]} />
      </div>
      <div className={styles.pagination}>
        <Pagination
          variation="secondary"
          pageCount={950}
          activePage={+page || 1}
          onChange={onChangePagination}
        />
      </div>
    </div>
  );
};

export default GoodsBlock;
