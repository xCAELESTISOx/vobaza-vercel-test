import { GetServerSideProps } from 'next';

import { api } from '../../assets/api';
import { ICategory } from '../../src/models/ICategory';
import { IGoodCard } from '../../src/models/IGood';
import { IFilter } from '../../src/models/IFilter';
import normalizeGoods from '../../assets/utils/normalizeGoods';

import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import GoodsBlock from '../../components/Goods/Block';
import CategoryHead from 'components/Goods/CategoryHead';

import styles from '../../styles/Home.module.scss';

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
  category: ICategory;
  filters: IFilter[];
  isExpress: boolean;
  goods: IGoodCard[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
  breadcrumbs: BreadcrumbType[];
}

const limit = 40;

export default function Catalog({
  category,
  filters,
  isExpress,
  goods,
  meta,
  breadcrumbs,
}) {
  return (
    <div className={styles.homePage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section>
        <div className="container">
          <CategoryHead category={category} isExpress={isExpress} />
          <GoodsBlock
            isExpress={isExpress}
            filters={filters}
            goods={goods}
            meta={meta}
          />
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
  let filters = null;
  let breadcrumbs = [];

  const { page, id, sort, ...activeFilters } = query;

  const isExpress = resolvedUrl.indexOf('/ekspress-dostavka') !== -1;
  const splitUrl = resolvedUrl
    .split('?')[0]
    .replace('/ekspress-dostavka', '')
    .split('_');
  const categoryId = Number(splitUrl[splitUrl.length - 1]) || 1;

  try {
    const params = {
      limit,
      offset: page ? (Number(page) - 1) * limit : 0,
      format: 'PUBLIC_LIST',
      'filter[category_id]': categoryId,
      sort: sort || undefined,
      'filter[label]': isExpress ? 'EXPRESS-DELIVERY' : undefined,
    };

    Object.entries(activeFilters).forEach((filter, index) => {
      params[`filter[filters][${index}][id]`] = filter[0];
      const filterValue = filter[1].toString().split('%-%');
      if (filterValue.length === 1) {
        const values = filterValue[0].split(',');
        values.forEach((value, valueIndex) => {
          params[`filter[filters][${index}][values][${valueIndex}]`] = value;
        });
      } else if (filterValue.length === 2) {
        params[`filter[filters][${index}][min]`] = filterValue[0];
        params[`filter[filters][${index}][max]`] = filterValue[1];
      }
    });

    const [goodsRes, categoryRes, filtersRes] = await Promise.all([
      api.getGoods(params),
      api.getCategory(categoryId),
      api.getCategoryFilters(categoryId),
    ]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
    category = categoryRes.data.data;
    filters = filtersRes.data.data;

    filters = filters.map((filter) =>
      filter.value_type === 'PRICE'
        ? {
            ...filter,
            meta: {
              min: Math.floor(filter.meta.min / 100),
              max: Math.ceil(filter.meta.max / 100),
            },
          }
        : filter
    );

    // Breadcrumbs
    if (isExpress) {
      breadcrumbs.push({
        title: 'Экспресс-доставка',
        href: '/katalog/ekspress-dostavka',
      });
    } else {
      breadcrumbs.push({
        title: 'Каталог мебели',
        href: '/katalog',
      });
    }

    if (category.ancestors && category.ancestors.length > 0) {
      category.ancestors.forEach((ancestor) => {
        breadcrumbs.push({
          title: ancestor.name,
          href: `/${ancestor.slug}_${ancestor.id}${
            isExpress ? '/ekspress-dostavka' : ''
          }`,
        });
      });
    }
    breadcrumbs.push({
      title: category.name,
      href: `/${category.slug}_${category.id}${
        isExpress ? '/ekspress-dostavka' : ''
      }`,
    });
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
      category,
      filters,
      isExpress,
      goods,
      meta,
      breadcrumbs,
    },
  };
};
