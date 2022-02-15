import type { GetServerSideProps } from 'next';

import { api } from '../assets/api';
import styles from '../styles/Home.module.scss';
import normalizeGoods from '../assets/utils/normalizeGoods';
import type { Banner } from '../src/models/IBanner';
import { IGood } from '../src/models/IGood';

import Banners from '../components/MainPage/Banners';
import PopularCategories from '../components/MainPage/CategoriesList';
import Collections from '../components/MainPage/Collections';
import Blog from '../components/MainPage/Blog';
import GoodsList from '../components/Goods/List';
import GoodsSwiper from '../components/Goods/Swiper';
import CartModal from '../components/Goods/Modals/Cart';

interface Props {
  banners: {
    slider: Array<Banner>;
    miniature: Array<Banner>;
  };
  hits: IGood[];
  newGoods: IGood[];
}

export default function Home(props: Props) {
  const { banners, hits, newGoods } = props;

  return (
    <div className={styles.homePage}>
      <CartModal />
      <section className={styles.bannersBlock}>
        <Banners forSlider={banners.slider} forMiniature={banners.miniature} />
      </section>
      <section className={styles.popularCategoriesBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Популярные категории </h2>
        </div>
        <PopularCategories />
      </section>
      {hits && hits.length > 0 && (
        <section className={styles.hitsBlock}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Хиты продаж</h2>
          </div>
          <GoodsSwiper goods={hits} />
        </section>
      )}
      <section className={styles.popularCategoriesBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Коллекции этого сезона </h2>
        </div>
        <Collections />
      </section>
      {newGoods && newGoods.length > 0 && (
        <section>
          <div className={`${styles.newGoodsBlock} container`}>
            <h2 className={styles.sectionTitle}>Новые предложения </h2>
            <GoodsList goods={newGoods} />
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
  let banners = {
    slider: [],
    miniature: [],
  };
  let hits = null;
  let newGoods = null;

  try {
    const [sliderBannersRes, miniatureBannersRes, hitsRes, newGoodsRes] =
      await Promise.all([
        api.getBannersByType('SLIDER'),
        api.getBannersByType('MINIATURE'),
        api.getHits(),
        api.getNewGoods(),
      ]);

    banners.slider = sliderBannersRes.data.data;
    banners.miniature = miniatureBannersRes.data.data;
    hits = normalizeGoods(hitsRes.data.data);
    newGoods = normalizeGoods(newGoodsRes.data.data);
  } catch (error) {}

  return {
    props: {
      banners,
      hits,
      newGoods,
    },
  };
};
