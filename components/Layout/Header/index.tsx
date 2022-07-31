import React, { FC, useEffect } from 'react';

import { api } from '../../../assets/api';
import { useGoods } from '../../../src/context/goods';
import { useAuth } from '../../../src/context/auth';

import SmallHeader from './Small';
import MainHeader from './Main';
import SubHeader from './Sub';
import Cookies from 'js-cookie';

const categories = [
  {
    title: 'Диваны',
    href: '/divany',
    menu: [
      [
        {
          title: 'Прямые диваны',
          href: '/divany/pryamye_divany',
        },
        {
          title: 'Угловые диваны',
          href: '/divany/uglovye_divany',
        },
        {
          title: 'Диваны-кровати',
          href: '/divany/divany_krovati',
        },
        {
          title: 'Модульные диваны',
          href: '/divany/modulnye_divany',
        },
      ],
      [
        {
          title: 'Софы',
          href: '/divany/sofy_6',
        },
        {
          title: 'Кухонные диваны',
          href: '/divany/kuxonnye_divany_7',
        },
        {
          title: 'Кушетки',
          href: '/divany/kusetki_8',
        },
        {
          title: 'Садовые диваны',
          href: '/divany/sadovye_divany_9',
        },
      ],
      [
        {
          title: 'Детские диваны',
          href: '/divany/detskie_divany_10',
        },
        {
          title: 'Наборы мягкой мебели',
          href: '/divany/nabory_myagkoi_mebeli_11',
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
          title: 'Кресла-качалки',
          href: '/kresla/kresla_kacalki_19',
        },
        {
          title: 'Кресла-кровати',
          href: '/kresla/kresla_krovati_20',
        },
        {
          title: 'Кресла-реклайнеры',
          href: '/kresla/kresla_reklainery_21',
        },
        {
          title: 'Офисные кресла',
          href: '/kresla/ofisnye_kresla_22',
        },
      ],
      [
        {
          title: 'Кресла руководителя',
          href: '/kresla/kresla_rukovoditelya_23',
        },
        {
          title: 'Игровые кресла',
          href: '/kresla/igrovye_kresla_24',
        },
        {
          title: 'Кресла-мешки',
          href: '/kresla/kresla_meski_25',
        },
        {
          title: 'Детские кресла',
          href: '/kresla/detskie_kresla_26',
        },
      ],
      [
        {
          title: 'Компьютерные кресла',
          href: '/kresla/kompyuternye_kresla_27',
        },
        {
          title: 'Садовые кресла',
          href: '/kresla/sadovye_kresla_28',
        },
        {
          title: 'Подвесные кресла',
          href: '/kresla/podvesnye_kresla_29',
        },
        {
          title: 'Мягкие кресла',
          href: '/kresla/myagkie_kresla_30',
        },
      ],
    ],
  },
  {
    title: 'Кровати',
    href: '/krovati_31',
    menu: [
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
    title: 'Матрасы',
    href: '/matrasy_43',
    menu: [
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
  {
    title: 'Шкафы',
    href: '/shkafy_74',
    menu: [
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
    title: 'Тумбы',
    href: '/tumby_64',
    menu: [
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
  {
    title: 'Столы',
    href: '/stoly_341',
  },
  {
    title: 'Стулья',
    href: '/stulya_51',
    menu: [
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
    title: 'Текстиль для дома',
    href: '/tekstil_dlya_doma_110',
    menu: [
      [
        {
          title: 'Подушки',
          href: '/tekstil_dlya_doma_110/poduski_111',
        },
        {
          title: 'Одеяла',
          href: '/tekstil_dlya_doma_110/odeyala_117',
        },
        {
          title: 'Постельные принадлежности',
          href: '/tekstil_dlya_doma_110/postelnye_prinadleznosti_118',
        },
        {
          title: 'Пледы',
          href: '/tekstil_dlya_doma_110/pledy_124',
        },
      ],
      [
        {
          title: 'Покрывала',
          href: '/tekstil_dlya_doma_110/pokryvala_125',
        },
        {
          title: 'Полотенца',
          href: '/tekstil_dlya_doma_110/polotenca_127',
        },
        {
          title: 'Кухонные варежки',
          href: '/tekstil_dlya_doma_110/kuxonnye_varezki_131',
        },
        {
          title: 'Прихватки',
          href: '/tekstil_dlya_doma_110/prixvatki_132',
        },
      ],
      [
        {
          title: 'Фартуки',
          href: '/tekstil_dlya_doma_110/fartuki_133',
        },
        {
          title: 'Скатерти',
          href: '/tekstil_dlya_doma_110/skatert_134',
        },
        {
          title: 'Наматрасники и чехлы для матрасов',
          href: '/tekstil_dlya_doma_110/namatrasniki_i_cexly_dlya_matrasov_135',
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
                href: '/katalog/divany1',
              },
              {
                title: 'Диваны-кровати ',
                href: '/katalog/divany2',
              },
              {
                title: 'Кушетки ',
                href: '/katalog/divany3',
              },
              {
                title: ' Модульные диваны ',
                href: '/katalog/divany4',
              },
              {
                title: 'Софы ',
                href: '/katalog/divany5',
              },
              {
                title: 'Садовые диваны  ',
                href: '/katalog/divany6',
              },
              {
                title: 'Кухонные диваны',
                href: '/katalog/divany7',
              },
              {
                title: 'Детские диваны',
                href: '/katalog/divany8',
              },
              {
                title: 'Подушки для диванов  ',
                href: '/katalog/divany9',
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

  const setCompareFromCookie = () => {
    const ids = Cookies.get('compareIds');
    if (ids) {
      dispatch({
        type: 'setCompare',
        payload: ids.split(',').map((id) => +id),
      });
    }
  };

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
        if (globalInfoRes.data.data.compare_products_ids) {
          dispatch({
            type: 'setCompare',
            payload: globalInfoRes.data.data.compare_products_ids,
          });
        } else {
          setCompareFromCookie();
        }
      } else {
        setCompareFromCookie();
      }
    } catch (error) {
      console.log(error);
      setCompareFromCookie();
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
