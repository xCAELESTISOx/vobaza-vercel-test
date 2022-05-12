import { AttributeDataType } from 'src/models/IAttributes';

export const mockProduct = {
  // subinfo: 'Коричневый, экокожа, аккордеон',
  in_stock: true,
  pickup: {
    available: true,
    places_count: 1,
    nearest_date: '25.01',
  },
  delivery: {
    default: { start_price: 990, nearest_date: '25.01' },
    express: {
      start_price: 1990,
      nearest_date: '25.01',
    },
  },
  variants: {
    variant_products: [
      {
        id: 1,
        slug: 'kozanyi_divan_2',
        sku: 'КД098-2-2',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2350-vobaza-divan-slim-evroknizhka-baklazhan-purpurno-seryy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      {
        id: 2,
        slug: 'Вариант 2',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_g972-3g.jpg',
            },
          },
        },
      },
      {
        id: 3,
        slug: 'Вариант 3',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2354-vobaza-divan-slim-evroknizhka-bolotnyy-grafitovyy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      {
        id: 4,
        slug: 'Вариант 4',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2350-vobaza-divan-slim-evroknizhka-baklazhan-purpurno-seryy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      {
        id: 5,
        slug: 'Вариант 5',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_g972-3g.jpg',
            },
          },
        },
      },
      {
        id: 6,
        slug: 'Вариант 6',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2354-vobaza-divan-slim-evroknizhka-bolotnyy-grafitovyy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      {
        id: 7,
        slug: 'Вариант 7',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2350-vobaza-divan-slim-evroknizhka-baklazhan-purpurno-seryy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      {
        id: 8,
        slug: 'Вариант 8',
        sku: 'asdasd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_g972-3g.jpg',
            },
          },
        },
      },
      {
        id: 9,
        slug: 'Вариант 9',
        sku : 'asd',
        main_image: {
          id: 1,
          variants: {
            small: {
              meta: { width: 48, height: 48 },
              url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2354-vobaza-divan-slim-evroknizhka-bolotnyy-grafitovyy-uglovoy-sleva-clone.jpg',
            },
          },
        },
      },
      // {
      //   id: 10,
      //   slug: 'Вариант 10',
      //   src: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2351-vobaza-divan-slim-evroknizhka-bezhevyy-ohra-uglovoy-sleva-clone.jpg',
      // },
      // {
      //   id: 11,
      //   slug: 'Вариант 11',
      //   src: 'https://vobaza.ru/images/thumbnails/68/68/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_ckw8-19.jpg',
      // },
      // {
      //   id: 12,
      //   slug: 'Вариант 12',
      //   src: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2353-vobaza-divan-slim-evroknizhka-korichnevato-oranzhevyy-shokoladnyy-uglovoy-sleva-clone.jpg',
      // },
    ],
    variants: [
      {
        attribute: {
          id: 1,
          name: 'Ширина',
          data_type: AttributeDataType.INTEGER,
        },
        values: [
          {
            is_current: true,
            value: 'asd',
            product: {
              id: 1,
              slug: 'Вариант 1',
              sku: 'asdasd',
              main_image: {
                id: 1,
                variants: {
                  small: {
                    meta: { width: 48, height: 48 },
                    url: 'https://vobaza.ru/images/thumbnails/68/68/detailed/2/2350-vobaza-divan-slim-evroknizhka-baklazhan-purpurno-seryy-uglovoy-sleva-clone.jpg',
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  images: [
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/44/%D0%BE%D1%82%D1%82%D0%BE%D0%BC%D0%B0%D0%BD%D0%BA%D0%B0.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_ckw8-19.jpg',
    'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_2_vot5-6i_xs7x-jy.jpg',
    'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_3_w4o5-rh_7u7b-cv.jpg',
    'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_5_31b4-t7_boen-f3.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_4_yaze-e6_lmu7-z2.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_6_ot2y-u4_fs73-2h.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/NEO_%D1%86%D0%B2%D0%B5%D1%82_-_25_26_1_mse3-ul.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC%D0%9F%D1%80%D0%B0%D0%B2_1_vs54-g5.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC%D0%9F%D1%80%D0%B0%D0%B2_2_6d1w-p8.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/40/%D1%81%D0%BB%D0%B8%D0%BC5.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_1_ckw8-19.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_2_vot5-6i_xs7x-jy.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_3_w4o5-rh_7u7b-cv.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_5_31b4-t7_boen-f3.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_4_yaze-e6_lmu7-z2.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC_6_ot2y-u4_fs73-2h.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/NEO_%D1%86%D0%B2%D0%B5%D1%82_-_25_26_1_mse3-ul.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC%D0%9F%D1%80%D0%B0%D0%B2_1_vs54-g5.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/5/%D0%A1%D0%BB%D0%B8%D0%BC%D0%9F%D1%80%D0%B0%D0%B2_2_6d1w-p8.jpg',
    // 'https://vobaza.ru/images/thumbnails/610/610/detailed/40/%D1%81%D0%BB%D0%B8%D0%BC5.jpg',
  ],
  options: [
    // {
    //   id: 'size',
    //   label: 'Размер шкафа(ШхВхГ):',
    //   type: 'select',
    //   variants: [
    //     { code: 1, value: '218см х 95см х 90см' },
    //     { code: 2, value: '218см х 85см х 80см' },
    //     { code: 3, value: '218см х 75см х 70см' },
    //   ] as unknown as Variant[],
    // },
    // {
    //   id: 'material',
    //   label: 'Материал',
    //   type: 'select',
    //   variants: [
    //     { code: 1, value: 'Искусственная шерсть' },
    //     { code: 2, value: 'Натуральная шерсть' },
    //     { code: 3, value: 'Эко-кожа' },
    //     { code: 4, value: 'Натуральная шерсть' },
    //     { code: 5, value: 'Искусственная шерсть' },
    //     { code: 6, value: 'Натуральная шерсть' },
    //   ] as unknown as Variant[],
    // },
    // {
    //   id: 'sleeping_place_size',
    //   label: 'Размер',
    //   type: 'select',
    //   variants: [
    //     { code: 1, value: '200см х 90см' },
    //     { code: 2, value: '200см х 80см' },
    //     { code: 3, value: '200см х 70см' },
    //   ] as unknown as Variant[],
    // },
  ],
  reviews: {
    count: 3,
    average_score: 4.33,
    countByScore: [
      { score: 5, count: 2 },
      { score: 4, count: 1 },
    ],
    posts: [
      {
        id: 1,
        user: 'Михеева Таисия',
        created_at: '2021-07-01T12:12:54.029Z',
        score: 4,
        content: {
          positive: 'Внешний вид, мягкость.',
          negative: 'Не трансформируется, соответственно, нет ящиков для белья',
          comment:
            'Очень понравился его внешний вид, серьезный, статный. Сидеть ну ооочень мягко, поэтому выбрал его.',
        },
      },
      {
        id: 2,
        user: 'Игорь Бабушкин',
        created_at: '2021-05-16T12:12:54.029Z',
        score: 5,
        content: {
          positive:
            'Качество. Стоит своих денег. Доставили быстро. Вместительный.',
          negative: '',
          comment:
            'Хороший диван, со своими задачами справляется. Качественно сделан, приятный на ощупь.',
        },
      },
      {
        id: 3,
        user: 'Коригова Аминат',
        created_at: '2021-04-05T12:12:54.029Z',
        score: 4,
        content: {
          positive:
            'Дорого-богато, как говорится. Оправдывает свою стоимость. Дешевле, чем у конкурентов. Смело можно брать, посоветую друзьям.',
          negative: 'Пупырки на подлокотниках.',
          comment:
            'В мою студию вписался идеально! Будь я дизайнером, пупырки с внешней стороны подлокотников на другие, эти по виду мне не особо нравится. но это я уже придираюсь',
        },
      },
    ],
  },
};
