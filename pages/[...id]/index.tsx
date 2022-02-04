import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { api } from '../../assets/api';
import styles from '../../styles/Catalog.module.scss';
import { ICategory } from '../../src/models/ICategory';
import { IGood } from '../../src/models/IGood';
import normalizeGoods from '../../assets/utils/normalizeGoods';

import tmpBannerImg1 from '../../src/tmp/bannerFilter.jpg';
import tmpBannerImg2 from '../../src/tmp/bannerFilterMob.jpg';

import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import CatalogList from '../../components/Catalog/List';
import GoodsBlock from '../../components/Goods/Block';

const tmpSeoText = {
  __html: `<div class="ty-wysiwyg-content vb-category-description"><p class="text-justify">В интернет-магазине «ВоБаза» представлен большой каталог диванов с фото и ценами. Удобный фильтр по категориям создает возможность расширенного выбора товаров по всевозможным характеристикам мягкой мебели. Здесь вы сможете подобрать подходящую модель для спальни, гостиной, кабинета или офиса по стоимости от 15990 руб. и купить понравившийся диван с доставкой в день заказа, продукция всегда в наличии.&nbsp;
</p>
<p class="text-justify">В интернет-магазине представлен большой ассортимент мягкой мебели от российских и зарубежных производителей. В продаже как недорогие, так и премиальные варианты прямых и угловых диванов со спальным местом, а также кушетки и декоративные подушки.</p>
<p class="text-justify">Чтобы сделать заказ на сайте и найти подходящий диван, воспользуйтесь фильтрами, подобрав идеальную модель. Основные характеристики – ШxВxГ, материал обивки, тип механизма раскладывания, цвет. В нашем магазине есть модели всех размеров – от компактных до больших, состоящих из нескольких модулей. На предложенной мебели используется большой выбор обивок, начиная от недорогой прочной рогожки, заканчивая роскошной натуральной кожей.<br></p>
<p>&nbsp;Доступна мебель с самыми популярными и надежными механизмами раскладки:</p>
<ul><li>тик-так;
</li><li>еврокнижка;
</li><li>аккордеон;
</li><li>дельфин;
</li><li>клик-кляк;
</li><li>французская раскладушка и др.
</li></ul><p class="text-justify">Расцветки представлены благородными оттенками, как в сдержанных тонах, так и в ярких. Купить диван в Москве можно в пару кликов, выбрав самостоятельно или воспользовавшись помощью менеджера для подбора и оформления заказа.<br></p>
<p class="text-justify">Мы предлагаем исключительно качественную мягкую мебель, получившую много положительных отзывов и высокие оценки покупателей. Стоимость продукции всегда обоснована и не включает в себя лишние наценки, поскольку мы работаем напрямую с производителями. Каждый клиент «ВоБаза» может приобрести любую мягкую мебель с гарантией от 1 года.</p></div>`,
};

interface Props {
  goods: IGood[];
  category: ICategory;
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
  breadcrumbs: BreadcrumbType[];
}

export default function Catalog({ goods, meta, category, breadcrumbs }) {
  const router = useRouter();
  const { page } = router.query as { [key: string]: string };

  return (
    <div className={styles.homePage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section>
        <div className="container">
          <div className={styles.bannerBlockMobile}>
            <Image src={tmpBannerImg2} alt="Banner" />
          </div>
          <h1 className={styles.sectionTitle}>
            {category.name} {page && page !== '1' && ` – страница ${page}`}
          </h1>
          <CatalogList list={[...Array(9)]} />
          <div className={styles.bannerBlock}>
            <Image src={tmpBannerImg1} alt="Banner" />
          </div>
          <GoodsBlock goods={goods} meta={meta} />
          <div className="seoText" dangerouslySetInnerHTML={tmpSeoText}></div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  resolvedUrl,
  query,
}) => {
  let goods = null;
  let meta = null;
  let category = null;
  let breadcrumbs = [
    {
      title: 'Каталог мебели',
      href: '/katalog',
    },
  ];

  const page = Number(query.page);
  // TODO 40
  const limit = 5;
  const splitUrl = resolvedUrl.split('_');
  const id = Number(splitUrl[splitUrl.length - 1]) || 1;

  try {
    const params = {
      limit,
      offset: page ? (page - 1) * limit : 0,
      format: 'FULL_WITH_MAIN_ATTRIBUTES',
      'filter[category_id]': id,
    };
    const [goodsRes, categoryRes] = await Promise.all([
      api.getGoods(params),
      api.getCategory(id),
    ]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
    category = categoryRes.data.data;

    if (category.ancestors && category.ancestors.length > 0) {
      category.ancestors.forEach((ancestor) => {
        breadcrumbs.push({
          title: ancestor.name,
          href: `/${ancestor.slug}_${ancestor.id}`,
        });
      });
    }
    breadcrumbs.push({
      title: category.name,
      href: `/${category.slug}_${category.id}`,
    });
  } catch (error) {}

  return {
    props: {
      goods,
      meta,
      category,
      breadcrumbs,
    },
  };
};
