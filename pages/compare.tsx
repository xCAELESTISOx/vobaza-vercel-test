import { GetServerSideProps } from 'next';

import checkAuth from 'app/api/auth';
import { IGoodCompare } from 'entities/products/model/IGood';
import { IAttributeCompare } from 'src/models/IAttributes';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import CompareList from '../components/Compare/List';
import { OneClickModal } from 'widgets/products';
import { CartModal } from 'widgets/products';

import styles from 'app/styles/Home.module.scss';
import { api } from 'app/api';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Сравнение характеристик',
    href: '/compare',
  },
];

type Props = {
  goods: IGoodCompare[];
  attributes: IAttributeCompare[];
};

export default function Compare({ goods, attributes }) {
  return (
    <div>
      <CartModal />
      <OneClickModal />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <h1 className={styles.sectionTitle}>Сравнить</h1>
        <CompareList initialGoods={goods} initialAttributes={attributes} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let goods = [];
  let attributes = [];

  try {
    const isLoggedIn = await checkAuth(req, false);
    let compareRes = null;

    if (isLoggedIn) {
      compareRes = await api.getAuthCompareList();
    } else {
      const compareIds = req.cookies['compareIds'];
      if (compareIds) {
        compareRes = await api.getCompareList(compareIds.split(','));
      }
    }
    if (compareRes) {
      goods = compareRes.data.data.products.map((product: IGoodCompare) => {
        return {
          ...product,
          price: product.price / 100,
          list_price: product.list_price ? product.list_price / 100 : null,
        };
      });
      attributes = compareRes.data.data.attributes;
    }
  } catch (error) {
    console.error(error);
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
      attributes,
    },
  };
};
