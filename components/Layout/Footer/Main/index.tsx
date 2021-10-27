import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

const footerLinks = [
  {
    title: 'Каталог',
    links: [
      {
        title: 'Диваны',
        href: '/divany',
      },
      {
        title: 'Кресла',
        href: '/kresla',
      },
      {
        title: 'Кровати',
        href: '/krovati',
      },
      {
        title: 'Матрасы',
        href: '/matrasy',
      },
      {
        title: 'Шкафы',
        href: '/shkafy',
      },
      {
        title: 'Тумбы',
        href: '/tumby',
      },
      {
        title: 'Столы',
        href: '/stoly',
      },
      {
        title: 'Все товары',
        href: '/katalog',
      },
    ],
  },
  {
    title: 'Покупателям',
    links: [
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
        title: 'Вопросы и ответы',
        href: '/otvety-na-voprosy',
      },
      {
        title: 'Политика конфиденциальности',
        href: '/politika-obrabotki-dannyh',
      },
      {
        title: 'Гарантия лучшей цены',
        href: '/garantiya-luchshey-ceny',
      },
    ],
  },
  {
    title: 'О компании',
    links: [
      {
        title: 'О компании',
        href: '/o-kompanii',
      },
      {
        title: 'Блог',
        href: '/blog',
      },
      {
        title: 'Документы',
        href: '/documents',
      },
      {
        title: 'Контакты',
        href: '/kontakty',
      },
    ],
  },
  {
    title: 'Партнерам',
    links: [
      {
        title: 'Информация для поставщиков',
        href: '/postavschikam-partneram',
      },
      {
        title: 'Стать партнером',
        href: '/',
      },
    ],
  },
];

const MainFooter: FC = () => {
  return (
    <div className={styles.mainFooter}>
      <div className="container">
        <div className={styles.mainFooterContent}>
          <div className={styles.mainFooterColumn}>
            <div className={styles.mainFooterColumnTitle}>
              Контактная информация
            </div>
            <div className={styles.mainFooterColumnItem}>
              <div className={styles.mainFooterColumnSubtitle}>
                Горячая линия
              </div>
              <a href="tel:+74951725526">+7(495) 172-55-26</a>
              <div>ежедневно</div>
              <div>с 9:00 до 21:00</div>
            </div>
            <div className={styles.mainFooterColumnItem}>
              <div className={styles.mainFooterColumnSubtitle}>
                Доставка заказов
              </div>
              <a href="tel:+74951725526">+7(495) 172-55-26 </a>
              <div>ежедневно</div>
              <div>с 9:00 до 21:00</div>
            </div>
            <div className={styles.mainFooterColumnItem}>
              <div className={styles.mainFooterColumnSubtitle}>
                Электронная почта
              </div>
              <a
                href="mailto:notify@vobaza.ru"
                className={styles.mainFooterColumnEmail}
              >
                notify@vobaza.ru
              </a>
            </div>
          </div>
          {footerLinks.map((item) => (
            <div className={styles.mainFooterColumn} key={item.title}>
              <div className={styles.mainFooterColumnTitle}>{item.title}</div>
              {item.links.map((link) => (
                <div
                  className={styles.mainFooterColumnItem}
                  key={link.title}
                  style={{ lineHeight: 'initial' }}
                >
                  <Link href={link.href} key={link.title}>
                    <a className={styles.mainFooterColumnLink}>{link.title}</a>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
