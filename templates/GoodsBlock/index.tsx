import { FC, useEffect, useState } from 'react';

import type { IGoodCard } from 'entities/products/model/IGood';
import { useAdvancedRouter } from 'shared/lib/useAdvancedRouter';

import { useSelector } from 'shared/lib/hooks/useSelector';

import { CategoryTags } from 'widgets/categories/ui/CategoryTags';
import { Pagination } from '@nebo-team/vobaza.ui.pagination/dist';
import { Title } from '@nebo-team/vobaza.ui.title';
import { CategoryFilters } from '../../widgets/categories';
import { CartModal } from '../../widgets/products';
import { ProductsList } from '../../widgets/products';
import Toggle from 'shared/ui/Toggle';

import styles from './styles.module.scss';
import Preloader from 'shared/ui/Preloader';

type Props = {
  withoutExpress?: boolean;
  categorySlug?: string;
  isExpress?: boolean;
  goods: IGoodCard[];
  withFilters?: boolean;
  isListLoading?: boolean;
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
    seo: {
      [key: string]: string;
    };
  };
};

export const GoodsBlock: FC<Props> = ({
  withoutExpress,
  withFilters,
  categorySlug,
  isExpress = false,
  isListLoading,
  goods,
  meta,
}) => {
  const [isOnlyExpress, setIsOnlyExpress] = useState(isExpress);
  const [isLoading, setIsLoading] = useState(true);

  const tags = useSelector((state) => state.tags.tags);
  const hasInvalidTags = useSelector((state) => state.tags.hasInvalidTags);
  const hasInvalidFilters = useSelector((state) => state.filters.hasInvalidFilters);

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
    setIsOnlyExpress(isExpress);
  }, [isExpress]);

  useEffect(() => {
    setIsLoading(false);
  }, [goods]);

  return (
    <div className={styles.goodsBlock}>
      <CartModal />
      {withFilters && (
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
            <CategoryFilters categorySlug={categorySlug} setIsLoading={setIsLoading} isLoading={isLoading} />
          </div>
        </>
      )}
      {(!goods.length || hasInvalidFilters) && !isListLoading && (
        <Title element="h3" style={{ marginTop: 20 }}>
          Нет товаров, соответствующих условию
        </Title>
      )}
      {hasInvalidTags && !!goods.length && (
        <Title element="h3" style={{ marginTop: 20 }}>
          При загрузке данных произошла ошибка
        </Title>
      )}
      {isListLoading ? (
        <Preloader />
      ) : goods.length > 0 && !isListLoading ? (
        <div className={`${styles.goodsList} ${isLoading ? styles.busy : ''}`}>
          <ProductsList goods={goods} />
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
