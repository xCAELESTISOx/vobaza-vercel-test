import { FC, useEffect, useState } from 'react';

import type { IFilter, IFilterFront } from '../../../src/models/IFilter';
import type { IGoodCard } from '../../../src/models/IGood';
import type { ICategoryTag } from 'src/models/ICategoryTag';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';

import { CategoryTags } from 'components/Category/CategoryTags';
import { Pagination } from '@nebo-team/vobaza.ui.pagination/dist';
import { CategoryFilters } from '../../Category/CategoryFilters';
import CartModal from '../Modals/Cart/Cart';
import GoodsList from '../List/index';
import Toggle from '../../UI/Toggle';

import styles from './styles.module.scss';

type Props = {
  withoutExpress?: boolean;
  categorySlug?: string;
  isExpress?: boolean;
  baseFilters?: IFilter[];
  tags?: ICategoryTag[];
  filters?: IFilter[];
  goods: IGoodCard[];
  currentFilters?: Record<number, IFilterFront>;
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
  currentTags?: ICategoryTag[];
};

export const GoodsBlock: FC<Props> = ({
  withoutExpress,
  categorySlug,
  isExpress,
  baseFilters,
  tags,
  filters,
  goods,
  currentFilters,
  meta,
  currentTags,
}) => {
  const [isOnlyExpress, setIsOnlyExpress] = useState(Boolean(isExpress));
  const [isLoading, setIsLoading] = useState(true);

  const { router } = useAdvancedRouter();
  const { page } = router.query;

  const toggleIsOnlyExpress = () => {
    setIsLoading(true);
    setIsOnlyExpress(!isOnlyExpress);

    const query = router.query;
    delete query['page'];
    delete query['id'];

    if (!isOnlyExpress) {
      router.push(
        {
          pathname: router.asPath.split('?')[0] + '/ekspress-dostavka',
          query,
        },
        null,
        { scroll: false }
      );
    } else {
      delete query['city'];
      router.push(
        {
          pathname: router.asPath.split('?')[0].replace('/ekspress-dostavka', ''),
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
    setIsOnlyExpress(Boolean(isExpress));
  }, [isExpress]);

  useEffect(() => {
    setIsLoading(false);
  }, [goods]);

  return (
    <div className={styles.goodsBlock}>
      <CartModal />
      {filters && (
        <>
          {Boolean(tags?.length) && (
            <CategoryTags categorySlug={categorySlug} tags={tags} setIsLoading={setIsLoading} />
          )}
          {!withoutExpress && (
            <div className={styles.goodsExpress}>
              <Toggle isActive={isOnlyExpress} onClick={toggleIsOnlyExpress}>
                Экспресс-доставка
              </Toggle>
            </div>
          )}
          <div className={styles.filtersBlock}>
            <CategoryFilters
              currentFilters={currentFilters}
              categorySlug={categorySlug}
              filters={filters}
              currentTags={currentTags}
              baseFilters={baseFilters}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
      {goods.length > 0 ? (
        <div className={`${styles.goodsList} ${isLoading ? styles.busy : ''}`}>
          <GoodsList goods={goods} />
        </div>
      ) : (
        <div className={styles.goodsListEmpty}>По вашему запросу ничего не найдено</div>
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
