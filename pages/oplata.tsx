import Link from 'next/link';

import styles from '../styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Оплата',
    href: '/oplata',
  },
];

export default function Payment() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Оплата</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageText}>
              Оплатить заказ можно на&nbsp;сайте или при получении.
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div>
              <Link href="/oplata">
                <a
                  className={`${styles.staticPageText} ${styles.link} ${styles.dotted}`}
                >
                  Наличными при получении
                </a>
              </Link>
            </div>
            <div>
              <Link href="/oplata">
                <a
                  className={`${styles.staticPageText} ${styles.link} ${styles.dotted}`}
                >
                  Банковской картой при получении
                </a>
              </Link>
            </div>
            <div>
              <Link href="/oplata">
                <a
                  className={`${styles.staticPageText} ${styles.link} ${styles.dotted}`}
                >
                  Банковской картой на сайте
                </a>
              </Link>
            </div>
            <div>
              <Link href="/oplata">
                <a
                  className={`${styles.staticPageText} ${styles.link} ${styles.dotted}`}
                >
                  В кредит
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Наличными при получении
            </div>
            <div className={styles.staticPageText}>
              После доставки вашего заказа курьером, вы&nbsp;можете оплатить
              стоимость покупки наличными. Мы&nbsp;предоставим вам документ,
              подтверждающий оплату и&nbsp;получение товара. Перед оплатой
              рекомендуем осмотреть и&nbsp;проверить комплектацию товара.
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Банковской картой при получении
            </div>
            <div className={styles.staticPageText}>
              Выбрав этот способ на&nbsp;сайте во&nbsp;время оформления,
              вы&nbsp;можете оплатить заказ картой при получении. Мы&nbsp;также
              выдадим вам документы и&nbsp;чеки, подтверждающие оплату
              и&nbsp;получение товара. Мы&nbsp;принимаем карты:
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Банковской картой на&nbsp;сайте
            </div>
            <div className={styles.staticPageText}>
              Выбрав этот вариант, вы&nbsp;можете оплатить заказ на&nbsp;сайте
              при помощи наших сервисов&nbsp;&mdash; партнеров. Просто введите
              данные карты и&nbsp;безопасно оплатите товар.
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>В&nbsp;кредит</div>
            <div className={styles.staticPageText}>
              На&nbsp;нашей платформе доступна покупка товаров по&nbsp;программе
              банка-партнера Тинькофф, используя кредит, подобранный
              индивидуально для вас.
              <br />
              Вам нужно:
              <br />
              &mdash;&nbsp;Выбрать товар.
              <br />
              &mdash;&nbsp;Начать оформлять заказ.
              <br />
              &mdash;&nbsp;В&nbsp;способе оплаты выбрать
              &laquo;В&nbsp;кредит&raquo;.
              <br />
              &mdash;&nbsp;Выбрать подходящие вам условия кредитования.
              <br />
              &mdash;&nbsp;Подать онлайн-заявку на&nbsp;получение кредита
              и&nbsp;также в&nbsp;режиме онлайн получить ответ от&nbsp;банка.
              <br />
              &mdash;&nbsp;Подписать договор.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
