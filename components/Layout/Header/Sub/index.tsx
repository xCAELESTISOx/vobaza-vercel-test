import React, { FC, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import HeaderMenu from '../Menu';

const rootMenu = [
  {
    title: 'Диваны и кресла',
    href: '/katalog/divany',
    tag: 'divany',
    menu: [
      {
        title: 'Диваны',
        href: '/katalog/divany',
        children: [
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
          ],
          [
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
              title: 'Бескаркасные диваны ',
              href: '/katalog/divany',
            },
          ],
          [
            {
              title: 'Подушки для диванов  ',
              href: '/katalog/divany',
            },
            {
              title: 'Офисные диваны',
              href: '/katalog/divany',
            },
          ],
        ],
      },
      {
        title: 'Кресла  ',
        href: '/katalog/kresla',
        children: [
          [
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
          ],
          [
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
          [
            {
              title: 'Пуфы',
              href: '/katalog/pufy',
            },
            {
              title: 'Банкетки ',
              href: '/katalog/banketki',
            },
          ],
        ],
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
    title: 'Вешалки и зеркала',
    href: '/katalog/divany',
  },
  {
    title: 'Текстиль',
    href: '/katalog/divany',
    tag: 'tekstil',
    menu: [
      {
        title: 'Текстиль для дома',
        href: '/katalog/tekstil',
        children: [
          [
            {
              title: 'Подушки',
              href: '/katalog/tekstil',
            },
            {
              title: 'Одеяла',
              href: '/katalog/tekstil',
            },
            {
              title: 'Наматрасники',
              href: '/katalog/tekstil',
            },
          ],
        ],
      },
    ],
  },
  {
    title: 'Гостиная',
    href: '/katalog/divany',
    isDivided: true,
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
];

type Props = {
  categories: any[];
};

const MainHeader: FC<Props> = ({ categories }) => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [withRoot, setWithRoot] = useState(false);

  const openMenuAll = () => {
    setWithRoot(true);
    setCurrentMenu(rootMenu);
  };
  const openMenu = (e) => {
    setWithRoot(false);
    setCurrentMenu(categories[e.target.dataset.index]);
  };
  const closeMenu = () => {
    setWithRoot(false);
    setCurrentMenu(undefined);
  };

  return (
    <div
      className={`${styles.subHeaderContainer} container`}
      onMouseLeave={closeMenu}
    >
      {currentMenu && <HeaderMenu rootMenu={currentMenu} withRoot={withRoot} />}
      <nav className={styles.subHeader}>
        <button
          className={`${styles.headerCategory} ${styles.headerCategoryAll} ${
            withRoot ? styles.active : ''
          }`}
          onMouseEnter={openMenuAll}
        >
          <Icon name="MenuBurger" /> Каталог
        </button>
        {categories.map((category, index) => (
          <Link href="/" key={category.title}>
            <a
              className={`${styles.headerCategory} ${
                currentMenu && currentMenu.title === category.title
                  ? styles.active
                  : ''
              }`}
              data-index={index}
              onMouseEnter={openMenu}
            >
              {category.title}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainHeader;
