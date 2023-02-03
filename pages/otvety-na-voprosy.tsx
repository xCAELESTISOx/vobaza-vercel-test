import styles from 'app/styles/StaticPages.module.scss';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';
import Accordeon from '../shared/ui/Accordeon';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Ответы на вопросы',
    href: '/otvety-na-voprosy',
  },
];

export default function FAQ() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Ответы на&nbsp;вопросы</h1>
          <div className={styles.staticPageInfo}>
            <Accordeon title="1. Как сделать заказ?" className={styles.staticPageAccordeon}>
              <div className={styles.staticPageInfo}>
                <div className={styles.staticPageText}>
                  1. Выберите понравившийся вам товар на&nbsp;сайте и&nbsp;добавьте его в&nbsp;корзину.
                </div>
                <div className={styles.staticPageText}>
                  2. Перейдите в&nbsp;корзину и&nbsp;нажмите &laquo;Оформить заказ&raquo;.
                </div>
                <div className={styles.staticPageText}>
                  3. Заполните нужные контактные данные, выберите способ доставки и&nbsp;введите адрес.
                </div>
                <div className={styles.staticPageText}>
                  4. Укажите дату и&nbsp;время доставки, необходимость сборки и/или подъема.
                </div>
                <div className={styles.staticPageText}>
                  5. Выберите способ оплаты (на&nbsp;сайте/ при получении/ в&nbsp;кредит).
                </div>
                <div className={styles.staticPageText}>
                  6. Проверьте правильность заполненных полей и&nbsp;оформите заказ.
                </div>
              </div>
            </Accordeon>
            <Accordeon title="2. Как я могу узнать, где находится мой заказ? " className={styles.staticPageAccordeon}>
              <div className={styles.staticPageInfo}>
                <div className={styles.staticPageText}>
                  Зайдите в&nbsp;личный кабинет в&nbsp;раздел &laquo;История заказов&raquo;. Там отображается информация
                  о&nbsp;статусе заказа.
                </div>
              </div>
            </Accordeon>
            <Accordeon title="3. Как получить заказ? " className={styles.staticPageAccordeon}>
              <div className={styles.staticPageInfo}>
                <div className={styles.staticPageText}>
                  Курьер привезет ваш заказ в&nbsp;ту&nbsp;дату и&nbsp;время, что вы&nbsp;указали при оформлении. При
                  выборе опции &laquo;Самовывоз&raquo; вам необходимо приехать на&nbsp;наш склад (Московская область,
                  Одинцово, ул. Внуковская,9). Для получения товара потребуется номер заказа.
                </div>
              </div>
            </Accordeon>
            <Accordeon title="4. Как изменить номер телефона? " className={styles.staticPageAccordeon}>
              <div className={styles.staticPageInfo}>
                <div className={styles.staticPageText}>
                  Чтобы изменить номер телефона, зайдите в&nbsp;раздел &laquo;Личные данные&raquo; вашего личного
                  кабинета. Там вы&nbsp;можете изменить свой номер телефона и&nbsp;другие контактные данные.
                </div>
              </div>
            </Accordeon>
            <Accordeon
              title="5. Мной не был найден ответ на интересующий вопрос. "
              className={styles.staticPageAccordeon}
            >
              <div className={styles.staticPageInfo}>
                <div className={styles.staticPageText}>
                  В&nbsp;этом случае вы&nbsp;можете позвонить по&nbsp;номеру клиентской поддержки&nbsp;
                  <a href="tel:+74951545483" className={`${styles.staticPageText} ${styles.link}`}>
                    +7 (495) 899-09-09
                  </a>
                  . График работы клиентской поддержки: с&nbsp;09:00 до&nbsp;21:00 без выходных.
                </div>
              </div>
            </Accordeon>
          </div>
        </div>
      </div>
    </div>
  );
}
