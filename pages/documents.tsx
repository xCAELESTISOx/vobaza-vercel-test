import Link from 'next/link';

import styles from '../styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Документы ООО «ВОБАЗА»',
    href: '/documents',
  },
];

export default function Documents() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Документы ООО «ВОБАЗА»</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageText}>
              1.{' '}
              <Link href="/docs/policy.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Политика конфиденциальности
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              2.{' '}
              <Link href="/docs/termos_of_use.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Пользовательское соглашение
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              3.{' '}
              <Link href="/docs/shopping.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Условия покупки товаров
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              4.{' '}
              <Link href="/docs/return.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Памятка по&nbsp;возврату
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              5.{' '}
              <Link href="/docs/form_return.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Бланк заявления на&nbsp;возврат
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              6.{' '}
              <Link href="/docs/license_partners.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Лицензия (Правила использования для партнёров)
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              7.{' '}
              <Link href="/docs/rules_delivery.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Правила маркировки, хранения и&nbsp;доставки
                </a>
              </Link>
            </div>
            <div className={styles.staticPageText}>
              8.{' '}
              <Link href="/docs/uslovia_hranenia_tovarov.pdf">
                <a
                  className={`${styles.staticPageText} ${styles.link}`}
                  target="_blank"
                >
                  Условия хранения товаров
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
