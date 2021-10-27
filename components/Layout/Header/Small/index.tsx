import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

const routes = [
  {
    title: 'Стать продавцом',
    href: '/',
  },
  {
    title: 'Доставка',
    href: '/dostavka',
  },
  {
    title: 'Оплата',
    href: '/oplata',
  },
  {
    title: 'Возврат',
    href: '/obmen-i-vozvrat',
  },
  {
    title: 'Контакты',
    href: '/kontakty',
  },
];

const SmallHeader: FC = () => {
  return (
    <div className={styles.smallHeader}>
      <div className="container">
        <nav className={styles.smallHeaderNav}>
          {routes.map((route: any) => (
            <Link href={route.href} key={route.title}>
              <a className={styles.smallHeaderItem}>{route.title}</a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SmallHeader;
