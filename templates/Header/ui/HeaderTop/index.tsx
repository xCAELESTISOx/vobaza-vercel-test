import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

const routes = [
  {
    title: 'Стать продавцом',
    href: '/apply-for-vendor',
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

export const HeaderTop: FC = () => {
  return (
    <div className={styles.smallHeader}>
      <div className="container">
        <nav className={styles.smallHeaderNav}>
          {routes.map((route) => (
            <Link href={route.href} key={route.title} prefetch={false}>
              <a className={styles.smallHeaderItem}>{route.title}</a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
