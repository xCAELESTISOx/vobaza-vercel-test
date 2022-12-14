import type { GetServerSideProps } from 'next';

import normalizeGoods from '../shared/lib/normalizers/normalizeGoods';
import normalizeCollections from '../shared/lib/normalizers/normalizeCollections';
import type { Banner } from '../src/models/IBanner';
import type { IGoodCard } from '../entities/products/model/IGood';
import type { ICategory } from '../entities/categories/model/ICategory';
import type { ICollection } from '../src/models/ICollection';

import Banners from '../components/MainPage/Banners';
import PopularCategories from '../components/MainPage/CategoriesList';
import Collections from '../components/MainPage/Collections';
import Blog from '../components/MainPage/Blog';
import { CartModal, ProductsCarousel, ProductsList } from '../widgets/products';

import { api } from '../app/api';
import styles from 'app/styles/Home.module.scss';

interface Props {
  banners: {
    slider: Array<Banner>;
    miniature: Array<Banner>;
  };
  hits: IGoodCard[];
  newGoods: IGoodCard[];
  popularCategories: ICategory[];
  collections: ICollection[];
}

export default function Home({ banners, hits, newGoods, popularCategories, collections }: Props) {
  return (
    <div className={styles.homePage}>
      <CartModal />
      <section className={styles.bannersBlock}>
        <Banners forSlider={banners.slider} forMiniature={banners.miniature} />
      </section>
      {popularCategories && popularCategories.length > 0 && (
        <section className={styles.popularCategoriesBlock}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Популярные категории </h2>
          </div>
          <PopularCategories categories={popularCategories} />
        </section>
      )}
      {hits && hits.length > 0 && (
        <section className={styles.hitsBlock}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Хиты продаж</h2>
          </div>
          <ProductsCarousel goods={hits} />
        </section>
      )}
      {collections && collections.length > 0 && (
        <section className={styles.popularCategoriesBlock}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Коллекции этого сезона </h2>
          </div>
          <Collections collections={collections} />
        </section>
      )}
      {newGoods && newGoods.length > 0 && (
        <section>
          <div className={`${styles.newGoodsBlock} container`}>
            <h2 className={styles.sectionTitle}>Новые предложения </h2>
            <ProductsList goods={newGoods} />
          </div>
        </section>
      )}
      <section className={styles.blogBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Блог</h2>
        </div>
        <Blog />
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const banners = {
    slider: [],
    miniature: [],
  };
  let hits = null;
  let newGoods = null;
  let popularCategories = null;
  let collections = null;

  try {
    const [sliderBannersRes, miniatureBannersRes, hitsRes, newGoodsRes, popularCategoriesRes, collectionsRes] =
      await Promise.all([
        api.getBanners({ type: 'SLIDER' }),
        api.getBanners({ type: 'MINIATURE', limit: 3 }),
        api.getHits(),
        api.getNewGoods(),
        api.getPopularCategories(),
        api.getCollections(),
      ]);

    banners.slider = sliderBannersRes.data.data;
    banners.miniature = miniatureBannersRes.data.data;
    hits = normalizeGoods(hitsRes.data.data);
    newGoods = normalizeGoods(newGoodsRes.data.data);
    popularCategories = popularCategoriesRes.data.data;
    collections = normalizeCollections(collectionsRes.data.data);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      banners,
      hits,
      newGoods,
      popularCategories,
      collections,
    },
  };
};
