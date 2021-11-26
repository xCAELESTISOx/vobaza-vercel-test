import Link from 'next/link';

import styles from '../styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Доставка',
    href: '/dostavka',
  },
];

export default function Delivery() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Доставка</h1>
          <div className={styles.staticPageInfo}>
            <div>
              <div className={`${styles.staticPageText} ${styles.heavy}`}>
                Просьба следовать мерам безопасности!
              </div>
              <div className={styles.staticPageText}>
                &mdash;&nbsp;соблюдать дистанцию 1.5-2&nbsp;метра.
              </div>
              <div className={styles.staticPageText}>
                &mdash;&nbsp;находиться в&nbsp;маске и&nbsp;в&nbsp;перчатках
                с&nbsp;момента получения заказа до&nbsp;уезда наших сотрудников.
              </div>
              <div className={styles.staticPageText}>
                &mdash;&nbsp;проветрить помещение до/после доставки.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <Link href="/sborka">
              <a
                className={`${styles.staticPageText} ${styles.link} ${styles.dotted}`}
              >
                Подъем
              </a>
            </Link>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Курьерская доставка</div>
            <div className={styles.staticPageText}>
              Доставка осуществляется 7&nbsp;дней в&nbsp;неделю с&nbsp;8:00
              до&nbsp;24:00
            </div>
            <div className={styles.staticPageText}>
              Оформление доставки вашего товара будет осуществляться
              на&nbsp;дату, согласованную с&nbsp;вами. Подтверждение доставки
              товаров будет осуществляться во&nbsp;время звонка наших
              операторов. В&nbsp;день доставки вам придет СМС уведомление.
            </div>
            <div className={styles.staticPageTable}>
              <div className={styles.staticPageTableRow}>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Зона доставки
                </div>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Стоимость
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  по&nbsp;Москве в&nbsp;пределах МКАД
                </div>
                <div className={styles.staticPageTableCell}>990&nbsp;₽</div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  за&nbsp;МКАД и&nbsp;по&nbsp;МО
                </div>
                <div className={styles.staticPageTableCell}>
                  990+30&nbsp;₽/км
                </div>
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Экспресс-доставка за&nbsp;1&nbsp;день
            </div>
            <div className={styles.staticPageText}>
              Доставка осуществляется в&nbsp;течение 3-6&nbsp;часов, если заказ
              сделан до&nbsp;17:00. Если заказ сделан после 17:00,
              то&nbsp;доставка осуществляется на&nbsp;следующий день.
            </div>
            <div className={styles.staticPageTable}>
              <div className={styles.staticPageTableRow}>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Зона доставки
                </div>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Стоимость
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  по&nbsp;Москве в&nbsp;пределах МКАД
                </div>
                <div className={styles.staticPageTableCell}>
                  1&nbsp;980&nbsp;₽
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  за&nbsp;МКАД и&nbsp;по&nbsp;МО
                </div>
                <div className={styles.staticPageTableCell}>1 980+60 ₽/км</div>
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Самовывоз</div>
            <div className={styles.staticPageText}>
              Время работы для самовывоза с&nbsp;9:00 до&nbsp;17:00
            </div>
            <div className={styles.staticPageText}>
              Для получения товара потребуется: номер заказа, чек.
            </div>
            <div className={styles.staticPageText}>
              Адрес: <br /> Россия, Московская область, Одинцово, Внуковская
              улица, 9
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
