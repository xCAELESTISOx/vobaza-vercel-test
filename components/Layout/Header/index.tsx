import React, { FC } from 'react';
import SmallHeader from './Small';
import MainHeader from './Main';
import SubHeader from './Sub';

const categories = [
  {
    title: 'Диваны',
    menu: [
      [
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
      ],
      [
        {
          title: 'Софы ',
          href: '/katalog/divany',
        },
        {
          title: 'Садовые диваны  ',
          href: '/katalog/divany',
        },
        {
          title: 'Бескаркасные диваны ',
          href: '/katalog/divany',
        },
        {
          title: 'Подушки для диванов  ',
          href: '/katalog/divany',
        },
      ],
    ],
    menuTitle: {
      title: 'Диваны',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Все диваны ',
      href: '/',
    },
  },
  {
    title: 'Кресла',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Кровати',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Матрасы',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Шкафы',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Тумбы',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Столы',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
  },
  {
    title: 'Текстиль',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/',
        },
        {
          title: 'Одеяла',
          href: '/',
        },
        {
          title: 'Наматрасники',
          href: '/',
        },
      ],
    ],
    menuTitle: {
      title: 'Текстиль для дома',
      href: '/katalog/divany',
    },
    allLink: {
      title: 'Весь текстиль для дома ',
      href: '/',
    },
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

const Header: FC = () => {
  return (
    <header>
      <SmallHeader />
      <MainHeader mobileCategories={mobileCategories} />
      <SubHeader categories={categories} />
    </header>
  );
};

export default Header;
