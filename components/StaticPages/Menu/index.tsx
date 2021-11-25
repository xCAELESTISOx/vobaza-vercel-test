import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const menu = [
  {
    title: 'О компании',
    href: '/o-kompanii',
  },
  {
    title: 'Контакты',
    href: '/kontakty',
  },
  {
    title: 'Доставка',
    href: '/dostavka',
  },
  {
    title: 'Подъем и сборка',
    href: '/sborka',
  },
  {
    title: 'Оплата',
    href: '/oplata',
  },
  {
    title: 'Возврат товаров',
    href: '/obmen-i-vozvrat',
  },
  {
    title: 'Ответы на вопросы',
    href: '/otvety-na-voprosy',
  },
  {
    title: 'Политика обработки данных',
    href: '/politika-obrabotki-dannyh',
  },
  {
    title: 'Поставщикам / Партнерам',
    href: '/postavschikam-partneram',
  },
  {
    title: 'Гарантия лучшей цены',
    href: '/garantiya-luchshey-ceny',
  },
  {
    title: 'Документы ООО «ВОБАЗА»',
    href: '/documents',
  },
];

const StaticPagesMenu: FC = () => {
  const router = useRouter();

  return (
    <div className={styles.staticPagesMenu}>
      {menu.map((item) => (
        <Link key={item.title} href={item.href}>
          <a
            className={`${styles.staticPagesMenuItem} ${
              router.pathname === item.href ? styles.active : ''
            }`}
          >
            {item.title}
          </a>
        </Link>
      ))}
    </div>
  );
};
export default StaticPagesMenu;
