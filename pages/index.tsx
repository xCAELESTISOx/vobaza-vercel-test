import { api } from '../assets/api';

import Banners from '../components/MainPage/Banners';
import PopularCategories from '../components/MainPage/CategoriesList';
import Collections from '../components/MainPage/Collections';
import Blog from '../components/MainPage/Blog';
import GoodsList from '../components/Goods/List';
import GoodsSwiper from '../components/Goods/Swiper';

import type { GetServerSideProps } from 'next';
import type { Banner } from '../src/models/IBanner';

import styles from '../styles/Home.module.scss';

interface Props {
  banners: {
    slider: Array<Banner>;
    miniature: Array<Banner>;
  };
}

export default function Home(props: Props) {
  const { banners } = props;

  return (
    <div className={styles.homePage}>
      <section className={styles.bannersBlock}>
        <Banners forSlider={banners.slider} forMiniature={banners.miniature} />
      </section>
      <section className={styles.popularCategoriesBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Популярные категории </h2>
        </div>
        <PopularCategories />
      </section>
      <section className={styles.hitsBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Хиты продаж</h2>
        </div>
        <GoodsSwiper />
      </section>
      <section className={styles.popularCategoriesBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Коллекции этого сезона </h2>
        </div>
        <Collections />
      </section>
      <section className={styles.newGoodsBlock}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Новые предложения </h2>
          <GoodsList goods={[...Array(6)]} />
        </div>
      </section>
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

  try {
    const [sliderBannersRes, miniatureBannersRes] = await Promise.all([
      api.getBannersByType('SLIDER'),
      api.getBannersByType('MINIATURE'),
    ]);

    banners.slider = sliderBannersRes.data.data;
    banners.miniature = miniatureBannersRes.data.data;
  } catch (error) {}

  return {
    props: {
      banners,
    },
  };
};
