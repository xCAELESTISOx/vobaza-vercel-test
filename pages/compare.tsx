import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.scss';

import checkAuth from 'assets/api/auth';
import { api } from 'assets/api';
import { IGoodCompare } from 'src/models/IGood';
import { IAttributeCompare } from 'src/models/IAttributes';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import CompareList from '../components/Compare/List';
import OneClick from 'components/Goods/Modals/OneClick/OneClick';
import CartModal from 'components/Goods/Modals/Cart/Cart';

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
      <OneClick />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <h1 className={styles.sectionTitle}>Сравнить</h1>
        <CompareList initialGoods={goods} initialAttributes={attributes} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  let goods = [];
  let attributes = [];

  try {
    const isLoggedIn = await checkAuth(req, false, true);
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
      attributes,
    },
  };
};
