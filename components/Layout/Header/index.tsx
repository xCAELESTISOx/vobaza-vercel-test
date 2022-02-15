import React, { FC, useEffect } from 'react';

import { api } from '../../../assets/api';
import { useGoods } from '../../../src/context/goods';
import { useAuth } from '../../../src/context/auth';

import SmallHeader from './Small';
import MainHeader from './Main';
import SubHeader from './Sub';

const categories = [
  {
    title: 'Диваны',
    href: '/divany',
    menu: [
      [
        {
          title: 'Угловые диваны',
          href: '/divany/uglovye-divany',
        },
        {
          title: 'Прямые диваны',
          href: '/divany/pryamye-divany',
        },
        {
          title: 'Малогабаритные диваны',
          href: '/divany/malogabaritnye-divany',
        },
        {
          title: 'Диваны-кровати',
          href: '/divany/divany-krovati',
        },
      ],
      [
        {
          title: 'Кушетки',
          href: '/divany/kushetki',
        },
        {
          title: 'Софы',
          href: '/divany/sofy',
        },
        {
          title: 'Раскладные диваны',
          href: '/divany/raskladnye-divany',
        },
        {
          title: 'Модульные диваны',
          href: '/divany/modulnye-divany',
        },
      ],
      [
        {
          title: 'Бескаркасные диваны',
          href: '/divany/beskarkasnye-divany',
        },
        {
          title: 'Детские диваны',
          href: '/divany/detskie-divany',
        },
        {
          title: 'Кухонные диваны',
          href: '/divany/kuhonnye-divany',
        },
        {
          title: 'Офисные диваны',
          href: '/divany/ofisnye-divany',
        },
      ],
      [
        {
          title: 'Садовые диваны',
          href: '/divany/sadovye-divany',
        },
        {
          title: 'Подушки для диванов',
          href: '/divany/podushki-dlya-divanov',
        },
      ],
    ],
    tags: [
      {
        title: 'Современный',
        href: '/katalog/divany',
      },
      {
        title: 'Лофт',
        href: '/katalog/divany',
      },
      {
        title: 'Скандинавский',
        href: '/katalog/divany',
      },
      {
        title: 'Классический',
        href: '/katalog/divany',
      },
      {
        title: 'Дизайнерский',
        href: '/katalog/divany',
      },
      {
        title: 'Прованс',
        href: '/katalog/divany',
      },
      {
        title: 'Минимализм',
        href: '/katalog/divany',
      },
      {
        title: 'Кантри',
        href: '/katalog/divany',
      },
      {
        title: 'Хай-тек',
        href: '/katalog/divany',
      },
      {
        title: 'Кухня',
        href: '/katalog/divany',
      },
      {
        title: 'Гостиная',
        href: '/katalog/divany',
      },
      {
        title: 'Детская',
        href: '/katalog/divany',
      },
      {
        title: 'Спальня',
        href: '/katalog/divany',
      },
      {
        title: 'Раскладной',
        href: '/katalog/divany',
      },
    ],
    links: [
      {
        title: 'Все диваны',
        href: '/',
      },
      {
        title: 'Скидки',
        href: '/',
      },
      {
        title: 'Распродажа',
        href: '/',
      },
      {
        title: 'Дешевле',
        href: '/',
      },
      {
        title: 'Дороже',
        href: '/',
      },
    ],
  },
  {
    title: 'Кресла',
    href: '/kresla',
    menu: [
      [
        {
          title: 'Мягкие кресла',
          href: '/kresla/myagkie-kresla',
        },
        {
          title: 'Кресла реклайнеры',
          href: '/kresla/kresla-reklaynery',
        },
        {
          title: 'Кресла-качалки',
          href: '/kresla/kresla-kachalki',
        },
        {
          title: 'Кресла-мешки',
          href: '/kresla/kresla-meshki',
        },
      ],
      [
        {
          title: 'Компьютерные кресла',
          href: '/kresla/kompyuternye-kresla',
        },
        {
          title: 'Офисные кресла',
          href: '/kresla/ofisnye-kresla',
        },
        {
          title: 'Кресла-кровати',
          href: '/kresla/kresla-krovati',
        },
        {
          title: 'Детские кресла',
          href: '/kresla/detskie-kresla',
        },
      ],
      [
        {
          title: 'Подвесные кресла',
          href: '/kresla/podvesnye-kresla',
        },
        {
          title: 'Садовые кресла',
          href: '/kresla/sadovye-kresla',
        },
      ],
    ],
  },
  {
    title: 'Кровати',
    href: '/krovati',
    menu: [
      [
        {
          title: 'Двуспальные кровати',
          href: '/krovati/dvuspalnye-krovati',
        },
        {
          title: 'Односпальные кровати',
          href: '/krovati/odnospalnye-krovati',
        },
        {
          title: 'Полутороспальные кровати',
          href: '/krovati/polutorospalnye-krovati',
        },
        {
          title: 'Детские кровати',
          href: '/krovati/detskie-krovati',
        },
      ],
      [
        {
          title: 'Двухъярусные кровати',
          href: '/krovati/dvuhyarusnye-krovati',
        },
        {
          title: 'Трехъярусные кровати',
          href: '/krovati/trehyarusnye-krovati',
        },
        {
          title: 'Кровати-чердаки',
          href: '/krovati/krovati-cherdaki',
        },
        {
          title: 'Кровати-раскладушки',
          href: '/krovati/krovati-raskladushki',
        },
      ],
      [
        {
          title: 'Кровати из массива',
          href: '/krovati/krovati-iz-massiva',
        },
        {
          title: 'Интерьерные кровати',
          href: '/krovati/interernye-krovati',
        },
        {
          title: 'Кровати с подъемным механизмом',
          href: '/krovati/krovati-s-podemnym-mehanizmom',
        },
        {
          title: 'Кровати трансформеры',
          href: '/krovati/krovati-transformery',
        },
      ],
      [
        {
          title: 'Кровати 80x200',
          href: '/krovati/krovati-80x200',
        },
        {
          title: 'Кровати 90x200',
          href: '/krovati/krovati-90x200',
        },
        {
          title: 'Кровати 120x200',
          href: '/krovati/krovati-120x200',
        },
        {
          title: 'Кровати 140x200',
          href: '/krovati/krovati-140x200',
        },
      ],
      [
        {
          title: 'Кровати 160x200',
          href: '/krovati/krovati-160x200',
        },
        {
          title: 'Кровати 180x200',
          href: '/krovati/krovati-180x200',
        },
        {
          title: 'Кровати 200x200',
          href: '/krovati/krovati-200x200',
        },
      ],
    ],
  },
  {
    title: 'Матрасы',
    href: '/matrasy',
    menu: [
      [
        {
          title: 'Двуспальные матрасы',
          href: '/matrasy/dvuspalnye-matrasy',
        },
        {
          title: 'Односпальные матрасы',
          href: '/matrasy/odnospalnye-matrasy',
        },
        {
          title: 'Полутороспальные матрасы',
          href: '/matrasy/polutorospalnye-matrasy',
        },
        {
          title: 'Матрасы жесткие',
          href: '/matrasy/matrasy-jestkie',
        },
      ],
      [
        {
          title: 'Матрасы средней жесткости',
          href: '/matrasy/matrasy-sredney-jestkosti',
        },
        {
          title: 'Матрасы мягкие',
          href: '/matrasy/matrasy-myagkie',
        },
        {
          title: 'Пружинны матрасы',
          href: '/matrasy/prujinny-matrasy',
        },
        {
          title: 'Беспружинные матрасы',
          href: '/matrasy/besprujinnye-matrasy',
        },
      ],
      [
        {
          title: 'Тонкие матрасы',
          href: '/matrasy/tonkie-matrasy',
        },
        {
          title: 'Матрасы-топперы',
          href: '/matrasy/matrasy-toppery',
        },
        {
          title: 'Детские матрасы',
          href: '/matrasy/detskie-matrasy',
        },
        {
          title: 'Садовые матрасы',
          href: '/matrasy/sadovye-matrasy',
        },
      ],
      [
        {
          title: 'Матрасы 80x200',
          href: '/matrasy/matrasy-80x200',
        },
        {
          title: 'Матрасы 90x200',
          href: '/matrasy/matrasy-90x200',
        },
        {
          title: 'Матрасы 120x200',
          href: '/matrasy/matrasy-120x200',
        },
        {
          title: 'Матрасы 140x200',
          href: '/matrasy/matrasy-140x200',
        },
      ],
      [
        {
          title: 'Матрасы 160x200',
          href: '/matrasy/matrasy-160x200',
        },
        {
          title: 'Матрасы 180x200',
          href: '/matrasy/matrasy-180x200',
        },
        {
          title: 'Матрасы 200x200',
          href: '/matrasy/matrasy-200x200',
        },
      ],
    ],
  },
  {
    title: 'Шкафы',
    href: '/shkafy',
    menu: [
      [
        {
          title: 'Шкафы-купе',
          href: '/shkafy/shkafy-kupe',
        },
        {
          title: 'Радиусные шкафы',
          href: '/shkafy/radiusnye-shkafy',
        },
        {
          title: 'Навесные шкафы',
          href: '/shkafy/navesnye-shkafy',
        },
        {
          title: 'Книжные шкафы',
          href: '/shkafy/knijnye-shkafy',
        },
      ],
      [
        {
          title: 'Угловые шкафы',
          href: '/shkafy/uglovye-shkafy',
        },
        {
          title: 'Шкафы-пеналы',
          href: '/shkafy/shkafy-penaly',
        },
        {
          title: 'Модульные шкафы',
          href: '/shkafy/modulnye-shkafy',
        },
        {
          title: 'Комбинированные шкафы',
          href: '/shkafy/kombinirovannye-shkafy',
        },
      ],
      [
        {
          title: 'Распашные шкафы',
          href: '/shkafy/raspashnye-shkafy',
        },
        {
          title: 'Платяные шкафы',
          href: '/shkafy/platyanye-shkafy',
        },
        {
          title: 'Гардеробные шкафы',
          href: '/shkafy/garderobnye-shkafy',
        },
        {
          title: 'Детские шкафы',
          href: '/shkafy/detskie-shkafy',
        },
      ],
      [
        {
          title: 'Антресоли',
          href: '/shkafy/antresoli',
        },
        {
          title: 'Серванты',
          href: '/shkafy/servanty',
        },
        {
          title: 'Шкафы-витрины',
          href: '/shkafy/shkafy-vitriny',
        },
        {
          title: 'Шкафы для ванной',
          href: '/shkafy/shkafy-dlya-vannoy',
        },
      ],
      [
        {
          title: 'Шкафчики для ванной',
          href: '/shkafy/shkafchiki-dlya-vannoy',
        },
        {
          title: 'Пеналы для ванной',
          href: '/shkafy/penaly-dlya-vannoy',
        },
      ],
    ],
  },
  {
    title: 'Тумбы',
    href: '/tumby',
    menu: [
      [
        {
          title: 'Тумбы под телевизор',
          href: '/tumby/tumby-pod-televizor',
        },
        {
          title: 'Тумбы для рабочего стола',
          href: '/tumby/tumby-dlya-rabochego-stola',
        },
        {
          title: 'Прикроватные тумбы',
          href: '/tumby/prikrovatnye-tumby',
        },
        {
          title: 'Бельевые тумбы',
          href: '/tumby/belevye-tumby',
        },
      ],
      [
        {
          title: 'Тумбы с раковиной',
          href: '/tumby/tumby-s-rakovinoy',
        },
        {
          title: 'Тумбы для обуви',
          href: '/tumby/tumby-dlya-obuvi',
        },
        {
          title: 'Офисные тумбы',
          href: '/tumby/ofisnye-tumby',
        },
      ],
    ],
  },
  {
    title: 'Столы',
    href: '/stoly',
    menu: [
      [
        {
          title: 'Компьютерные столы',
          href: '/stoly/kompyuternye-stoly',
        },
        {
          title: 'Игровые столы',
          href: '/stoly/igrovye-stoly',
        },
        {
          title: 'Столы-трансформеры',
          href: '/stoly/stoly-transformery',
        },
        {
          title: 'Столы-книжки',
          href: '/stoly/stoly-knijki',
        },
      ],
      [
        {
          title: 'Письменные столы',
          href: '/stoly/pismennye-stoly',
        },
        {
          title: 'Столы для переговоров',
          href: '/stoly/stoly-dlya-peregovorov',
        },
        {
          title: 'Детские столы',
          href: '/stoly/detskie-stoly',
        },
        {
          title: 'Парты',
          href: '/stoly/party',
        },
      ],
      [
        {
          title: 'Кухонные столы',
          href: '/stoly/kuhonnye-stoly',
        },
        {
          title: 'Обеденные столы',
          href: '/stoly/obedennye-stoly',
        },
        {
          title: 'Кофейные столики',
          href: '/stoly/kofeynye-stoliki',
        },
        {
          title: 'Чайные столики',
          href: '/stoly/chaynye-stoliki',
        },
      ],
      [
        {
          title: 'Журнальные столы',
          href: '/stoly/jurnalnye-stoly',
        },
        {
          title: 'Приставные столы',
          href: '/stoly/pristavnye-stoly',
        },
        {
          title: 'Консольные столы',
          href: '/stoly/konsolnye-stoly',
        },
        {
          title: 'Сервировочные столы',
          href: '/stoly/servirovochnye-stoly',
        },
      ],
      [
        {
          title: 'Туалетные столики',
          href: '/stoly/tualetnye-stoliki',
        },
        {
          title: 'Барные столы',
          href: '/stoly/barnye-stoly',
        },
        {
          title: 'Садовые столы',
          href: '/stoly/sadovye-stoly',
        },
      ],
    ],
  },
  {
    title: 'Скамейки',
    href: '/skameyki',
  },
  {
    title: 'Табуреты',
    href: '/taburety',
    menu: [
      [
        {
          title: 'Барные табуреты',
          href: '/taburety/barnye-taburety',
        },
      ],
    ],
  },
  {
    title: 'Текстиль',
    href: '/tekstil',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/tekstil/podushki',
        },
        {
          title: 'Одеяла',
          href: '/tekstil/odeyala',
        },
        {
          title: 'Наматрасники',
          href: '/tekstil/namatrasniki',
        },
      ],
    ],
  },
];
const mobileCategories = [
  {
    title: 'Все товары',
    menu: [
      {
        title: 'Диваны и кресла',
        href: '/katalog/divany',
        tag: 'divany',
        menu: [
          {
            title: 'Диваны',
            href: '/katalog/divany',
            children: [
              {
                title: 'Прямые диваны ',
                href: '/katalog/divany',
              },
              {
                title: ' Угловые диваны ',
                href: '/katalog/divany',
              },
              {
                title: 'Диваны-кровати ',
                href: '/katalog/divany',
              },
              {
                title: 'Кушетки ',
                href: '/katalog/divany',
              },
              {
                title: ' Модульные диваны ',
                href: '/katalog/divany',
              },
              {
                title: 'Софы ',
                href: '/katalog/divany',
              },
              {
                title: 'Садовые диваны  ',
                href: '/katalog/divany',
              },
              {
                title: 'Кухонные диваны',
                href: '/katalog/divany',
              },
              {
                title: 'Детские диваны',
                href: '/katalog/divany',
              },
              {
                title: 'Подушки для диванов  ',
                href: '/katalog/divany',
              },
            ],
          },
          {
            title: 'Кресла  ',
            href: '/katalog/kresla',
            children: [
              {
                title: 'Кресла-качалки   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Кресла-кровати',
                href: '/katalog/kresla',
              },
              {
                title: 'Кресла-мешки   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Садовые кресла   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Подвесные кресла   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Мягкие кресла   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Компьютерные кресла   ',
                href: '/katalog/kresla',
              },
              {
                title: 'Офисные кресла   ',
                href: '/katalog/kresla',
              },
            ],
          },
          {
            title: 'Пуфы',
            href: '/katalog/pufy',
          },
          {
            title: 'Банкетки ',
            href: '/katalog/banketki',
          },
        ],
      },
      {
        title: 'Шкафы, комоды и тумбы',
        href: '/katalog/divany',
      },
      {
        title: 'Столы и стулья',
        href: '/katalog/divany',
      },
      {
        title: 'Кровати и матрасы',
        href: '/katalog/divany',
      },
      {
        title: 'Хранение и порядок',
        href: '/katalog/divany',
      },
      {
        title: 'Вешалки, обувницы, зеркала',
        href: '/katalog/divany',
      },
    ],
  },
  {
    title: 'Комнаты',
    menu: [
      {
        title: 'Гостиная',
        href: '/katalog/divany',
      },
      {
        title: 'Детская',
        href: '/katalog/divany',
      },
      {
        title: 'Прихожая',
        href: '/katalog/divany',
      },
      {
        title: 'Кухня и столовая',
        href: '/katalog/divany',
      },
      {
        title: 'Ванная',
        href: '/katalog/divany',
      },
      {
        title: 'Дача и сад',
        href: '/katalog/divany',
      },
    ],
  },
];

type Props = {
  openPhoneCallModal: () => void;
};

const Header: FC<Props> = ({ openPhoneCallModal }) => {
  const { dispatch } = useGoods();
  const { state } = useAuth();
  const { isLoggedIn } = state;

  const getGlobalInfo = async () => {
    try {
      const globalInfoRes = await api.getGlobalInfo();
      if (globalInfoRes) {
        dispatch({
          type: 'setFavorites',
          payload: globalInfoRes.data.data.favorite_products_ids,
        });
        dispatch({
          type: 'setCartSize',
          payload: globalInfoRes.data.data.basket_size,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGlobalInfo();
  }, [isLoggedIn]);

  return (
    <header>
      <SmallHeader />
      <MainHeader
        openPhoneCallModal={openPhoneCallModal}
        mobileCategories={mobileCategories}
      />
      <SubHeader categories={categories} />
    </header>
  );
};

export default Header;
