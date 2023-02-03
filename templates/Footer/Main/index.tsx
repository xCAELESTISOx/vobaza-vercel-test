import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { useSelector } from 'shared/lib/hooks/useSelector';
import { getLinkFromMenuItem } from 'shared/lib/getLinkFromMenuItem';

import Accordeon from 'shared/ui/Accordeon';

import styles from './styles.module.scss';

const footerLinks = [
  {
    title: 'Каталог',
    links: [],
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
        href: '/apply-for-vendor',
      },
    ],
  },
];

const MainFooter: FC = () => {
  const [menuLinks, setMenuLinks] = useState(footerLinks);
  const sideMenuLinks = useSelector((state) => state.menus.sideMenu);
  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');

  useEffect(() => {
    if (sideMenuLinks.length) {
      const catalogueLinks = [];

      sideMenuLinks.forEach((item) => {
        if (item.children?.length) {
          item.children.forEach((catalogueItem) => {
            if (getLinkFromMenuItem(catalogueItem, isExpress)) {
              catalogueLinks.push({
                title: catalogueItem.name || catalogueItem.category.name,
                href: getLinkFromMenuItem(catalogueItem, isExpress),
              });
            }
          });
        }
      });

      setMenuLinks((prev) => {
        const newLinks = prev.slice(1);
        newLinks.unshift({
          title: 'Каталог',
          links: [...catalogueLinks],
        });

        return newLinks;
      });
    }
  }, [sideMenuLinks]);

  return (
    <>
      <div className={styles.mainFooter}>
        <div className="container">
          <div className={styles.mainFooterContent}>
            <div className={styles.mainFooterColumn}>
              <div className={styles.mainFooterColumnTitle}>Контактная информация</div>
              <div className={styles.mainFooterColumnItem}>
                <div className={styles.mainFooterColumnSubtitle}>Горячая линия</div>
                <a className={styles.link} href="tel:+74951725526">
                  +7 (495) 172-55-26
                </a>
                <div>ежедневно</div>
                <div>с 9:00 до 21:00</div>
              </div>
              <div className={styles.mainFooterColumnItem}>
                <div className={styles.mainFooterColumnSubtitle}>Доставка заказов</div>
                <a className={styles.link} href="tel:+74951725526">
                  +7 (495) 172-55-26{' '}
                </a>
                <div>ежедневно</div>
                <div>с 9:00 до 21:00</div>
              </div>
              <div className={styles.mainFooterColumnItem}>
                <div className={styles.mainFooterColumnSubtitle}>Электронная почта</div>
                <a href="mailto:info@vobaza.ru" className={styles.mainFooterColumnEmail}>
                  info@vobaza.ru
                </a>
              </div>
            </div>
            {menuLinks.map((item) => (
              <div className={styles.mainFooterColumn} key={item.title}>
                <div className={styles.mainFooterColumnTitle}>{item.title}</div>
                {item.links.map((link) => (
                  <div className={styles.mainFooterColumnItem} key={link.title} style={{ lineHeight: 'initial' }}>
                    <Link href={link.href} key={link.title}>
                      <a className={styles.mainFooterColumnLink}>{link.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.mainFooterContentPhone}>
          {menuLinks.map((item) => (
            <Accordeon key={item.title} title={item.title}>
              {item.links.map((link) => (
                <div className={styles.mainFooterColumnItem} key={link.title} style={{ lineHeight: 'initial' }}>
                  <Link href={link.href} key={link.title}>
                    <a className={styles.mainFooterColumnLink}>{link.title}</a>
                  </Link>
                </div>
              ))}
            </Accordeon>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainFooter;
