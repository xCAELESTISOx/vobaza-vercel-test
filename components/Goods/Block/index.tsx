import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { IGood } from '../../../src/models/IGood';

import { Pagination } from '@nebo-team/vobaza.ui.pagination';
import GoodsList from '../List/index';
import Toggle from '../../UI/Toggle';
import GoodsFilters from '../Filters';

type Props = {
  goods: IGood[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
};

const GoodsBlock: FC<Props> = ({ goods, meta }) => {
  const router = useRouter();
  const { page } = router.query;
  const [isOnlyExpress, setIsOnlyExpress] = useState(true);

  const toggleIsOnlyExpress = () => {
    setIsOnlyExpress(!isOnlyExpress);
  };

  const onChangePagination = (value: number) => {
    router.replace({
      query: {
        ...router.query,
        page: value,
      },
    });
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
      {goods.length > 0 ? (
        <div className={styles.goodsList}>
          <GoodsList goods={goods} />
        </div>
      ) : (
        <div className={styles.goodsListEmpty}>
          По вашему запросу ничего не найдено
        </div>
      )}
      {meta?.list?.pages_count > 1 && (
        <div className={styles.pagination}>
          <Pagination
            variation="secondary"
            pageCount={meta.list.pages_count}
            activePage={+page || 1}
            onChange={onChangePagination}
          />
        </div>
      )}
    </div>
  );
};

export default GoodsBlock;
