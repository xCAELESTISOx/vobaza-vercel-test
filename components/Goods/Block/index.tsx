import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { IGoodCard } from '../../../src/models/IGood';
import { IFilter } from '../../../src/models/IFilter';

import { Pagination } from '@nebo-team/vobaza.ui.pagination/dist';
import GoodsList from '../List/index';
import Toggle from '../../UI/Toggle';
import GoodsFilters from '../Filters';
import CartModal from '../Modals/Cart/Cart';

type Props = {
  filters?: IFilter[];
  isExpress?: boolean;
  withoutExpress?: boolean;
  goods: IGoodCard[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
};

const GoodsBlock: FC<Props> = ({
  filters,
  isExpress,
  withoutExpress,
  goods,
  meta,
}) => {
  const router = useRouter();
  const { page } = router.query;
  const [isOnlyExpress, setIsOnlyExpress] = useState(!!isExpress);
  const [isLoading, setIsLoading] = useState(true);

  const toggleIsOnlyExpress = () => {
    setIsLoading(true);
    setIsOnlyExpress(!isOnlyExpress);

    if (!isOnlyExpress) {
      const query = router.query;
      delete query['page'];
      delete query['id'];

      router.push(
        {
          pathname: router.asPath.split('?')[0] + '/ekspress-dostavka',
          query,
        },
        null,
        { scroll: false }
      );
    } else {
      const query = router.query;
      delete query['page'];
      delete query['id'];
      router.push(
        {
          pathname: router.asPath
            .split('?')[0]
            .replace('/ekspress-dostavka', ''),
          query,
        },
        null,
        { scroll: false }
      );
    }
  };

  const onChangePagination = (value: number) => {
    router.replace({
      query: {
        ...router.query,
        page: value,
      },
    });
  };

  useEffect(() => {
    setIsOnlyExpress(!!isExpress);
  }, [isExpress]);
  useEffect(() => {
    setIsLoading(false);
  }, [goods]);

  return (
    <div className={styles.goodsBlock}>
      <CartModal />
      {filters && (
        <>
          {!withoutExpress && (
            <div className={styles.goodsExpress}>
              <Toggle isActive={isOnlyExpress} onClick={toggleIsOnlyExpress}>
                Экспресс-доставка
              </Toggle>
            </div>
          )}
          <div className={styles.filtersBlock}>
            <GoodsFilters filters={filters} setIsLoading={setIsLoading} />
          </div>
        </>
      )}
      {goods.length > 0 ? (
        <div className={`${styles.goodsList} ${isLoading ? styles.busy : ''}`}>
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
