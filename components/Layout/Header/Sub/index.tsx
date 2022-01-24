import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import HeaderMenu from '../Menu';

const rootMenu = [
  {
    title: 'Диваны и кресла',
    href: '/divany-i-kresla',
    tag: 'divany',
    icon: 'divany',
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
    title: 'Кровати и матрасы',
    href: '/krovati-i-matrasy',
    icon: 'krovati',
  },
  {
    title: 'Шкафы и тумбы',
    href: '/shkafy-i-tumby',
    icon: 'shkafy',
  },
  {
    title: 'Столы и стулья',
    href: '/stoly-i-stulya',
    icon: 'stoly',
  },
  {
    title: 'Хранение',
    href: '/hranenie',
    icon: 'hranenie',
  },
  {
    title: 'Вешалки и зеркала',
    href: '/veshalki-i-zerkala',
    icon: 'veshalki',
  },
  {
    title: 'Гостиная',
    href: '/gostinaya',
    icon: 'gostinaya',
    isDivided: true,
  },
  {
    title: 'Спальня',
    href: '/spalnya',
    icon: 'spalnya',
  },
  {
    title: 'Детская',
    href: '/detskaya',
    icon: 'detskaya',
  },
  {
    title: 'Прихожая',
    href: '/prihojaya',
    icon: 'prihojaya',
  },
  {
    title: 'Кухня',
    href: '/kuhnya',
    icon: 'kuhnya',
  },
  {
    title: 'Ванная',
    href: '/vannaya',
    icon: 'vannaya',
  },
  {
    title: 'Кабинет',
    href: '/kabinet',
    icon: 'kabinet',
  },
  {
    title: 'Офис',
    href: '/ofis',
    icon: 'ofis',
  },
  {
    title: 'Дача и сад',
    href: '/dacha-i-sad',
    icon: 'dacha',
  },
];

type Props = {
  categories: any[];
};

const MainHeader: FC<Props> = ({ categories }) => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState(null);
  const [withRoot, setWithRoot] = useState(false);

  const openMenuAll = () => {
    setWithRoot(true);
    setCurrentMenu(rootMenu);
  };
  const openMenu = (e) => {
    setWithRoot(false);
    if (categories[e.target.dataset.index].menu) {
      setCurrentMenu(categories[e.target.dataset.index]);
    } else {
      setCurrentMenu(undefined);
    }
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
          <Link href={category.href} key={category.title}>
            <a
              className={`${styles.headerCategory} ${
                (currentMenu && currentMenu.title === category.title) ||
                router.asPath.includes(category.href)
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
