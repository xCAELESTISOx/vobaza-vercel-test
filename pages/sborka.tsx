import styles from '../styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Сборка',
    href: '/sborka',
  },
];

export default function Assembly() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Подъем</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageTable}>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  Малогабаритный товар не&nbsp;более 4х&nbsp;единиц (суммарно
                  массой до&nbsp;20кг)
                </div>
                <div className={styles.staticPageTableCell}>Бесплатно</div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  Крупногабаритный или малогабаритный товар более 4х&nbsp;единиц
                  или суммарно массой более 20кг на&nbsp;лифте
                </div>
                <div className={styles.staticPageTableCell}>Бесплатно</div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  Ручной подъем заказа (суммарно массой более 20кг)
                </div>
                <div className={styles.staticPageTableCell}>
                  200&nbsp;₽/этаж
                </div>
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageTitle}>Сборка</div>
            <div className={styles.staticPageText}>
              При оформлении услуги доставки и&nbsp;подъема мягкой мебели
              (в&nbsp;категории Диваны, Кушетки, Кресла) сборка этих категорий
              осуществляется бесплатно.
            </div>
            <div className={styles.staticPageText}>
              Стоимость сборки корпусной мебели составляет&nbsp;12%
              от&nbsp;стоимости мебели, но&nbsp;не&nbsp;менее 1200&nbsp;₽.
              Корпусная мебель&nbsp;&mdash; это категории Шкаф, Кровать, Стол,
              Комод, Тумба, Стулья, Табурет.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
