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
        href: '/divany_1',
        children: [
          [
            {
              title: 'Прямые диваны',
              href: '/divany_1/pryamye_divany_2',
            },
            {
              title: 'Угловые диваны',
              href: '/divany_1/uglovye_divany_3',
            },
            {
              title: 'Диваны-кровати',
              href: '/divany_1/divany_krovati_4',
            },
            {
              title: 'Модульные диваны',
              href: '/divany_1/modulnye_divany_5',
            },
          ],
          [
            {
              title: 'Софы',
              href: '/divany_1/sofy_6',
            },
            {
              title: 'Кухонные диваны',
              href: '/divany_1/kuxonnye_divany_7',
            },
            {
              title: 'Кушетки',
              href: '/divany_1/kusetki_8',
            },
            {
              title: 'Садовые диваны',
              href: '/divany_1/sadovye_divany_9',
            },
          ],
          [
            {
              title: 'Детские диваны',
              href: '/divany_1/detskie_divany_10',
            },
            {
              title: 'Наборы мягкой мебели',
              href: '/divany_1/nabory_myagkoi_mebeli_11',
            },
          ],
        ],
      },
      {
        title: 'Кресла  ',
        href: '/kresla_18',
        children: [
          [
            {
              title: 'Кресла-качалки',
              href: '/kresla_18/kresla_kacalki_19',
            },
            {
              title: 'Кресла-кровати',
              href: '/kresla_18/kresla_krovati_20',
            },
            {
              title: 'Кресла-реклайнеры',
              href: '/kresla_18/kresla_reklainery_21',
            },
            {
              title: 'Офисные кресла',
              href: '/kresla_18/ofisnye_kresla_22',
            },
          ],
          [
            {
              title: 'Кресла руководителя',
              href: '/kresla_18/kresla_rukovoditelya_23',
            },
            {
              title: 'Игровые кресла',
              href: '/kresla_18/igrovye_kresla_24',
            },
            {
              title: 'Кресла-мешки',
              href: '/kresla_18/kresla_meski_25',
            },
            {
              title: 'Детские кресла',
              href: '/kresla_18/detskie_kresla_26',
            },
          ],
          [
            {
              title: 'Компьютерные кресла',
              href: '/kresla_18/kompyuternye_kresla_27',
            },
            {
              title: 'Садовые кресла',
              href: '/kresla_18/sadovye_kresla_28',
            },
            {
              title: 'Подвесные кресла',
              href: '/kresla_18/podvesnye_kresla_29',
            },
            {
              title: 'Мягкие кресла',
              href: '/kresla_18/myagkie_kresla_30',
            },
          ],
        ],
      },
    ],
  },
  {
    title: 'Кровати и матрасы',
    href: '/krovati-i-matrasy',
    tag: 'krovati',
    icon: 'krovati',
    menu: [
      {
        title: 'Кровати',
        href: '/krovati_31',
        children: [
          [
            {
              title: 'Односпальные кровати',
              href: '/krovati_31/odnospalnye_krovati_32',
            },
            {
              title: 'Полутороспальные кровати',
              href: '/krovati_31/polutorospalnye_krovati_33',
            },
            {
              title: 'Двуспальные кровати',
              href: '/krovati_31/dvuspalnye_krovati_34',
            },
            {
              title: 'Двухъярусные кровати',
              href: '/krovati_31/dvuxyarusnye_krovati_35',
            },
          ],
          [
            {
              title: 'Трехъярусные кровати',
              href: '/krovati_31/trexyarusnye_krovati_36',
            },
            {
              title: 'Кровати-чердаки',
              href: '/krovati_31/krovati_cerdaki_37',
            },
            {
              title: 'Детские кровати',
              href: '/krovati_31/detskie_krovati_38',
            },
            {
              title: 'Кровати-трансформеры',
              href: '/krovati_31/krovati_transformery_39',
            },
          ],
          [
            {
              title: 'Основания для кровати',
              href: '/krovati_31/osnovaniya_dlya_krovati_40',
            },
            {
              title: 'Кроватки для новорожденных',
              href: '/krovati_31/krovatki_dlya_novorozdennyx_41',
            },
            {
              title: 'Интерьерные кровати',
              href: '/krovati_31/interernye_krovati_42',
            },
          ],
        ],
      },
      {
        title: 'Матрасы  ',
        href: '/matrasy_43',
        children: [
          [
            {
              title: 'Двуспальные матрасы',
              href: '/matrasy_43/detskie_matrasy_44',
            },
            {
              title: 'Матрасы топперы',
              href: '/matrasy_43/matrasy_toppery_45',
            },
            {
              title: 'Матрасы коконы',
              href: '/matrasy_43/matrasy_kokony_46',
            },
            {
              title: 'Односпальные матрасы',
              href: '/matrasy_43/odnospalnye_matrasy_47',
            },
          ],
          [
            {
              title: 'Полутороспальные матрасы',
              href: '/matrasy_43/polutorospalnye_matrasy_48',
            },
            {
              title: 'Двуспальные матрасы',
              href: '/matrasy_43/dvuspalnye_matrasy_49',
            },
          ],
        ],
      },
    ],
  },
  {
    title: 'Шкафы и тумбы',
    href: '/shkafy-i-tumby',
    tag: 'shkafy',
    icon: 'shkafy',
    menu: [
      {
        title: 'Шкафы',
        href: '/shkafy_74',
        children: [
          [
            {
              title: 'Шкафы-купе',
              href: '/shkafy_74/skafy_kupe_75',
            },
            {
              title: 'Распашные шкафы',
              href: '/shkafy_74/raspasnye_skafy_76',
            },
            {
              title: 'Шкафы-пеналы',
              href: '/shkafy_74/skafy_penaly_77',
            },
            {
              title: 'Комбинированные шкафы',
              href: '/shkafy_74/kombinirovannye_skafy_78',
            },
          ],
          [
            {
              title: 'Модульные шкафы',
              href: '/shkafy_74/modulnye_skafy_79',
            },
            {
              title: 'Шкафы-витрины',
              href: '/shkafy_74/skafy_vitriny_80',
            },
            {
              title: 'Книжные шкафы',
              href: '/shkafy_74/kniznye_skafy_81',
            },
          ],
        ],
      },
      {
        title: 'Тумбы  ',
        href: '/tumby_64',
        children: [
          [
            {
              title: 'Прикроватные тумбы',
              href: '/tumby_64/prikrovatnye_tumby_65',
            },
            {
              title: 'Тумбы под раковину',
              href: '/tumby_64/tumby_pod_rakovinu_66',
            },
            {
              title: 'Тумбы под телевизор',
              href: '/tumby_64/tumby_pod_televizor_67',
            },
            {
              title: 'Тумбы под стиральную машину',
              href: '/tumby_64/tumby_pod_stiralnuyu_masinu_68',
            },
          ],
          [
            {
              title: 'Бельевые тумбы',
              href: '/tumby_64/belevye_tumby_69',
            },
            {
              title: 'Тумбы для обуви',
              href: '/tumby_64/tumby_dlya_obuvi_70',
            },
            {
              title: 'Тумбы для ванной',
              href: '/tumby_64/tumby_dlya_vannoi_71',
            },
            {
              title: 'Тумбы для рабочего стола',
              href: '/tumby_64/tumby_dlya_rabocego_stola_72',
            },
          ],
          [
            {
              title: 'Тумбы с раковиной',
              href: '/tumby_64/tumby_s_rakovinoi_73',
            },
          ],
        ],
      },
    ],
  },
  {
    title: 'Столы и стулья',
    href: '/stoly-i-stulya',
    tag: 'stoly',
    icon: 'stoly',
    menu: [
      {
        title: 'Стулья  ',
        href: '/stulya_51',
        children: [
          [
            {
              title: 'Стулья-трансформеры',
              href: '/stulya_51/stulya_transformery_52',
            },
            {
              title: 'Кухонные стулья',
              href: '/stulya_51/kuxonnye_stulya_53',
            },
            {
              title: 'Офисные стулья',
              href: '/stulya_51/ofisnye_stulya_54',
            },
            {
              title: 'Барные стулья',
              href: '/stulya_51/barnye_stulya_55',
            },
          ],
          [
            {
              title: 'Стулья-стремянки',
              href: '/stulya_51/stulya_stremyanki_56',
            },
            {
              title: 'Наборы стульев',
              href: '/stulya_51/nabory_stulev_57',
            },
            {
              title: 'Садовые стулья',
              href: '/stulya_51/sadovye_stulya_58',
            },
            {
              title: 'Детские стулья',
              href: '/stulya_51/detskie_stulya_59',
            },
          ],
        ],
      },
      {
        title: 'Столы',
        href: '/stoly_341',
        children: [],
      },
    ],
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
      {currentMenu && (
        <HeaderMenu
          rootMenu={currentMenu}
          withRoot={withRoot}
          closeMenu={closeMenu}
        />
      )}
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
