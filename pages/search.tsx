import { GetServerSideProps } from 'next';

import { api } from '../assets/api';
import { IGoodCard } from '../src/models/IGood';
import { num2str } from '../assets/utils';
import normalizeGoods from '../assets/utils/normalizeGoods';

import Breadcrumbs from '../components/Layout/Breadcrumbs';
import GoodsBlock from '../components/Goods/Block';

import styles from '../styles/Home.module.scss';

let breadcrumbs = [
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
    <div className={styles.homePage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section>
        <div className="container">
          <h1 className={styles.sectionTitle}>Результаты поиска</h1>
          <div className={styles.sectionSubTitle}>
            {num2str(meta.list.count, ['Найден', 'Найдено', 'Найдено'])}{' '}
            {meta.list.count}{' '}
            {num2str(meta.list.count, ['товар', 'товара', 'товаров'])}
          </div>
          <GoodsBlock filters={[]} withoutExpress goods={goods} meta={meta} />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
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
    const [goodsRes] = await Promise.all([api.getGoods(params)]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
  } catch (error) {
    console.log(error);
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
