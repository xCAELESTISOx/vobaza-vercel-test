import Image from 'next/image';
// import Link from 'next/link';

import styles from 'app/styles/Partners.module.scss';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';
// import { Button } from '@nebo-team/vobaza.ui.button/dist';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Поставщикам / Партнерам',
    href: '/postavschikam-partneram',
  },
];

export default function About() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Поставщикам / Партнерам</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Надежный партнер для вашего бизнеса</div>
            <div className={styles.staticPageText}>
              Мы&nbsp;платформа продажи товаров для дома, офиса и&nbsp;дачи. Нашими партнерами являются продавцы
              и&nbsp;производители мебели и&nbsp;предметов интерьера.
            </div>
          </div>
          <div className={styles.staticPageImage}>
            <Image src="/vb-partners.png" alt="" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Преимущества работы с нами</div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.partnersIcons}>
              <div className={styles.partnersItem}>
                <div className={styles.partnersItemIcon}>
                  <Image src="/vb-partners-icon-3.png" alt="иконка" width="120" height="120" />
                </div>
                <div className={styles.partnersItemText}>
                  Изучаем рынок, продвигаем ваши товары, привлекаем покупателей
                </div>
              </div>
              <div className={styles.partnersItem}>
                <div className={styles.partnersItemIcon}>
                  <Image src="/vb-partners-icon-2.png" alt="иконка" width="120" height="120" />
                </div>
                <div className={styles.partnersItemText}>
                  Мы&nbsp;сами храним товар, собираем заказ и&nbsp;доставляем до&nbsp;клиента
                </div>
              </div>
              <div className={styles.partnersItem}>
                <div className={styles.partnersItemIcon}>
                  <Image src="/vb-partners-icon-1.png" alt="иконка" width="120" height="120" />
                </div>
                <div className={styles.partnersItemText}>
                  Взаимодействуем с&nbsp;покупателем после продажи, решаем все возникшие вопросы
                </div>
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Благодаря нашей простой схеме сотрудничества, вы&nbsp;можете стать нашим партнером всего за&nbsp;два шага:
            </div>
            <div className={styles.staticPageText}>
              1. Оставьте заявку на&nbsp;подключение. Наши менеджеры свяжутся с&nbsp;вами, помогут с&nbsp;договором
              и&nbsp;подключением к&nbsp;платформе.
              <br />
              2. Загрузите товары на&nbsp;сайт. Вы&nbsp;можете сделать это самостоятельно или доверить нашим
              специалистам.
              <br />
              3. Доступны следующие модели сотрудничества.
            </div>
            <div className={styles.staticPageText}>
              <span className={`${styles.staticPageText} ${styles.bold}`}>&mdash;&nbsp;FBO</span> или{' '}
              <span className={`${styles.staticPageText} ${styles.bold}`}>
                Fulfillment by&nbsp;Operator (фулфилмент)
              </span>
              . Комплексная услуга маркетплейса по&nbsp;реализации товара. Продавец использует маркетплейс как витрину,
              управляет ассортиментом и&nbsp;ценами. Продавцу необходимо &mdash;&nbsp;сделать заявку на&nbsp;поставку,
              упаковать товары, распечатать документы, поставить товары на&nbsp;склад маркетплейса в&nbsp;коробке или на
              паллете в&nbsp;зависимости от&nbsp;объема и&nbsp;в&nbsp;определенные сроки.
            </div>
            <div className={styles.staticPageText}>
              ВоБаза принимает и&nbsp;хранит товары, комплектует и&nbsp;доставляет заказы, а&nbsp;также обрабатывает
              возвраты.
            </div>
            <div className={styles.staticPageText}>
              <span className={`${styles.staticPageText} ${styles.bold}`}>&mdash;&nbsp;FBS</span> или{' '}
              <span className={`${styles.staticPageText} ${styles.bold}`}>
                Fulfillment by&nbsp;Seller (кросс-док) доставка под заказ
              </span>
              . Продавец храните товары на&nbsp;своем складе. Когда покупатель сделал заказ, вам нужно самостоятельно
              его собрать, упаковать и&nbsp;промаркировать по&nbsp;требованиям ВоБаза, подготовить сопроводительные
              документы, а&nbsp;затем доставить на&nbsp;склад маркетплейса (самому или воспользоваться курьерской
              компанией ВоБаза). В&nbsp;этой цепочке маркетплейс доставляет покупателю заказ.
            </div>
            <div className={styles.staticPageText}>
              <span className={`${styles.staticPageText} ${styles.bold}`}>&mdash;&nbsp;DBS</span> или{' '}
              <span className={`${styles.staticPageText} ${styles.bold}`}>Delivery by&nbsp;Seller (дропшиппинг)</span>.
              Маркетплейс используется только в&nbsp;качестве витрины, а&nbsp;все этапы от&nbsp;первой
              до&nbsp;&laquo;последней мили&raquo; организует продавец (при получении заказа продавец самостоятельно
              осуществляет доставку до&nbsp;конечного покупателя).
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            {/* <Link href="/apply-for-vendor" prefetch={false}>
              <a>
                <Button className={styles.staticPageButton} size="big" text="Оставить заявку на партнерство" />
              </a>
            </Link> */}
            <div className={styles.staticPageText}>
              За&nbsp;подробной информацией обращайтесь по&nbsp;номеру
              <br />
              <a href="tel:+74951340990" className={`${styles.staticPageText} ${styles.link}`}>
                +7(495)134-09-90
              </a>
              <br />
              или пишите на&nbsp;почту{' '}
              <a href="mailto:partners@vobaza.ru" className={`${styles.staticPageText} ${styles.link}`}>
                partners@vobaza.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
