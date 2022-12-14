import { GetServerSideProps } from 'next';
import axios from 'axios';

import normalizeGoods from '../shared/lib/normalizers/normalizeGoods';
import { formatAxiosError } from 'shared/lib/formatAxiosError';
import { IGoodCard } from '../entities/products/model/IGood';
import { num2str } from 'shared/lib';

import Breadcrumbs from 'shared/ui/Breadcrumbs';
import { GoodsBlock } from '../templates/GoodsBlock';

import styles from 'app/styles/Home.module.scss';
import { api } from '../app/api';

const breadcrumbs = [
  {
    title: 'Результаты поиска',
    href: '/search',
  },
];

interface Props {
  goods: IGoodCard[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
}

export default function Catalog({ goods, meta }) {
  return (
    <div className={styles.page}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section>
        <div className="container">
          <h1 className={styles.sectionTitle}>Результаты поиска</h1>
          <div className={styles.sectionSubTitle}>
            {num2str(meta.list.count, ['Найден', 'Найдено', 'Найдено'])} {meta.list.count}{' '}
            {num2str(meta.list.count, ['товар', 'товара', 'товаров'])}
          </div>
          <GoodsBlock withoutExpress goods={goods} meta={meta} />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  let goods = null;
  let meta = null;

  const { page, sort, text } = query;
  const limit = 40;

  try {
    const params = {
      limit,
      offset: page ? (Number(page) - 1) * limit : 0,
      format: 'PUBLIC_LIST',
      sort: sort || undefined,
      'filter[text]': text || undefined,
      'filter[include_variants]': true,
    };
    const goodsRes = await api.getGoods(params);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const text = formatAxiosError(error);
      console.error(text);
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      goods,
      meta,
    },
  };
};
