import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import type { ICategoryTag } from 'src/models/ICategoryTag';
import type { ICategory } from '../../src/models/ICategory';
import type { IGoodCard } from '../../src/models/IGood';
import type { IFilter, IFilterFront } from '../../src/models/IFilter';
import normalizeGoods from '../../assets/utils/normalizers/normalizeGoods';
import { getTagsByUrl } from 'assets/utils/Category/getTagsByUrl';
import { getFiltersFromQuery } from 'assets/utils/Category/filters/getFiltersFromQuery';
import { getFiltersFromTags } from 'assets/utils/Category/filters/getFiltersFromTags';

import Breadcrumbs, { BreadcrumbType } from '../../components/Layout/Breadcrumbs';
import GoodsBlock from '../../components/Goods/GoodsBlock';
import CategoryHead from 'components/Category/CategoryHead';

import styles from '../../styles/Home.module.scss';
import { api } from '../../assets/api';

import { mockCategoryTags } from 'assets/mockData/mockCategoryTags';

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

const convertFiltersIfPrice = (filters: IFilter[]) => {
  return filters.map((filter) =>
    filter.value_type === 'PRICE'
      ? {
          ...filter,
          meta: {
            min: +(filter.meta.min / 100).toFixed(),
            max: +(filter.meta.max / 100).toFixed(),
          },
        }
      : filter
  );
};

const getParamsFromQuery = (
  params: { [key: string]: number | string | string[] | boolean },
  activeFilters: { [key: string]: string | string[] }
) => {
  const newParams = { ...params };
  if (activeFilters && Object.keys(activeFilters).length) {
    newParams['filter[include_variants]'] = true;
  }
  Object.entries(activeFilters).forEach((filter, index) => {
    newParams[`filter[filters][${index}][id]`] = filter[0];
    const filterValue = filter[1].toString().split('%-%');
    if (filterValue.length === 1) {
      const values = filterValue[0].split(',');
      values.forEach((value, valueIndex) => {
        newParams[`filter[filters][${index}][values][${valueIndex}]`] = value;
      });
    } else if (filterValue.length === 2) {
      newParams[`filter[filters][${index}][min]`] = filterValue[0];
      newParams[`filter[filters][${index}][max]`] = filterValue[1];
    }
  });

  return newParams;
};

interface Props {
  category: ICategory;
  filters: IFilter[];
  goods: IGoodCard[];
  tags: ICategoryTag[];
  baseFilters: IFilter[];
  breadcrumbs: BreadcrumbType[];
  currentTags: ICategoryTag[];
  currentFilters: { [key: number]: IFilterFront };
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
}

const LIMIT = 40;

export default function Catalog({
  category,
  filters,
  goods,
  tags,
  currentFilters,
  currentTags,
  baseFilters,
  breadcrumbs,
  meta,
}: Props) {
  const router = useRouter();

  const isExpress = router.asPath.indexOf('/ekspress-dostavka') !== -1;

  const currentTag = currentTags[currentTags.length - 1] || null;

  return (
    <>
      <Head>
        {category.seo_title && <title>{currentTag?.page_title || category.seo_title}</title>}
        {category.keywords && <meta name="keywords" content={currentTag?.keywords || category.keywords} />}
        {category.seo_description && (
          <meta name="description" content={currentTag?.description || category.seo_description} />
        )}
      </Head>
      <div className={styles.homePage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container">
            <CategoryHead category={category} currentTag={currentTag} isExpress={isExpress} />
            <GoodsBlock
              categorySlug={category.slug}
              currentFilters={currentFilters}
              isExpress={isExpress}
              filters={filters}
              tags={tags}
              baseFilters={baseFilters}
              goods={goods}
              meta={meta}
              currentTags={currentTags}
            />
            <div className="seoText" dangerouslySetInnerHTML={tmpSeoText}></div>
          </div>
        </section>
      </div>
    </>
  );
}

// TODO: Буквально весь этот кошмар необходимо переработать
export const getServerSideProps: GetServerSideProps<Props> = async ({ resolvedUrl, query }) => {
  let goods = null;
  let meta = null;
  let category: ICategory | null = null;
  let filters: IFilter[] = [];
  let baseFilters: IFilter[] = null;
  let currentFilters: { [key: number]: IFilterFront } | null = null;
  let currentTags: ICategoryTag[] = [];
  let breadcrumbs: BreadcrumbType[] = [];
  let tags: ICategoryTag[] = [];

  const { page, id, sort, city, ...activeFilters } = query;
  const activeQueryFilters = { ...activeFilters };

  const isExpress = resolvedUrl.indexOf('/ekspress-dostavka') !== -1;

  try {
    const categoryRes = await api.getCategoryByPath(resolvedUrl.split('?')[0].replace('/ekspress-dostavka', ''));
    // const categoryRes = await api.getCategoryByPath('/divany/pryamye_divany');
    category = categoryRes.data.data;

    // Убрать запрос, когда в getCategoryByPath добавят параметры для получения предков
    const res = await api.getCategory(category.id);
    const categoryAncestors = res.data.data.ancestors;

    // 1. Получить все доступные для категории теги
    const { data: tagsData } = await api.getCategoryTags(category.id);
    tags = !tagsData.data.length && resolvedUrl.includes('/pryamye_divany') ? mockCategoryTags : tagsData.data;
    // 2. Получить по урлу массив всех активных тегов и уровень активных тегов

    const { currentTags: appliedTags } = getTagsByUrl(resolvedUrl, tags, [
      ...categoryAncestors.map((i) => i.slug),
      category.slug,
    ]);

    // Получить
    const tagFilters = appliedTags.map(({ filter }) => filter);
    tagFilters.forEach((filter) => {
      let value: string | string[] = filter.values as string[];
      if (filter.type === 'NUMERIC_RANGE') {
        let multiplier = filter.value_type === 'PRICE' ? 100 : 1;
        value = filter.values.map((i) => i * multiplier).join('%-%');
      }
      activeQueryFilters[filter.id] = value;
    });
    currentTags = appliedTags;

    const initialParams = {
      limit: LIMIT,
      offset: page ? (Number(page) - 1) * LIMIT : 0,
      format: 'PUBLIC_LIST',
      'filter[category_id]': category.id,
      sort: sort || undefined,
      'filter[label]': isExpress ? 'EXPRESS-DELIVERY' : undefined,
    };
    const params = getParamsFromQuery(initialParams, activeQueryFilters);

    const [goodsRes, filtersRes, baseFiltersRes] = await Promise.all([
      api.getGoods(params),
      api.getCategoryFilters(category.id, params),
      api.getCategoryFilters(category.id),
    ]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
    filters = filtersRes.data.data;
    baseFilters = baseFiltersRes.data.data;

    filters = convertFiltersIfPrice(filters);
    baseFilters = convertFiltersIfPrice(baseFilters);

    if (Object.keys(activeQueryFilters).length && filters.length > 0) {
      currentFilters = getFiltersFromQuery(activeQueryFilters, filters);
    }

    // 4. Получить из активных тегов все фильтры, которые должны быть применены
    const tagsFilters = getFiltersFromTags(currentTags, filters);
    currentFilters = { ...currentFilters, ...tagsFilters };
    // 5. Добавить теги в breadcrumps

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

    let href = '';

    if (categoryAncestors?.length > 0) {
      categoryAncestors.forEach((ancestor) => {
        href += '/' + ancestor.slug;
        breadcrumbs.push({
          title: ancestor.name,
          href: href + (isExpress ? '/ekspress-dostavka' : ''),
        });
      });
    }
    href += '/' + category.slug;
    breadcrumbs.push({
      title: category.name,
      href: href + (isExpress ? '/ekspress-dostavka' : ''),
    });
    currentTags.forEach((tag) => {
      href += '/' + tag.slug;

      breadcrumbs.push({
        title: tag.name,
        href: href + (isExpress ? '/ekspress-dostavka' : ''),
      });
    });
  } catch (error) {
    console.error(error || error);
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
      baseFilters,
      currentFilters,
      currentTags,
      goods,
      meta,
      breadcrumbs,
      tags,
    },
  };
};
