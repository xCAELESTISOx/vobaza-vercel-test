import styles from 'app/styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Возврат товаров',
    href: '/obmen-i-vozvrat',
  },
];

export default function ExchangeAndReturn() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Памятка по&nbsp;возврату</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Возврат товара надлежащего качества</div>
            <div className={styles.staticPageText}>
              Потребитель вправе отказаться от&nbsp;товара в&nbsp;любое время до&nbsp;его передачи, а&nbsp;после
              передачи товара&nbsp;&mdash;{' '}
              <span className={`${styles.staticPageText} ${styles.heavy}`}>в&nbsp;течение семи дней.</span>
            </div>
            <div className={`${styles.staticPageText} ${styles.heavy}`}>
              Обратите внимание: возврат товара надлежащего качества возможен только в&nbsp;случае, если сохранены его
              товарный вид, потребительские свойства, а&nbsp;также документ, подтверждающий факт и&nbsp;условия покупки
              указанного товара (например, скриншот личного кабинета).
            </div>
            <div className={styles.staticPageText}>
              Отсутствие у&nbsp;потребителя документа, подтверждающего факт и&nbsp;условия покупки товара,
              не&nbsp;лишает его возможности ссылаться на&nbsp;другие доказательства приобретения товара у&nbsp;данного
              продавца.
            </div>
            <div className={styles.staticPageText}>
              Потребитель не&nbsp;вправе отказаться от&nbsp;товара надлежащего качества, имеющего
              индивидуально-определенные свойства, если указанный товар может быть использован исключительно
              приобретающим его потребителем.
            </div>
            <div className={styles.staticPageText}>
              При отказе потребителя от&nbsp;товара продавец должен возвратить ему денежную сумму, уплаченную
              потребителем по&nbsp;договору, за&nbsp;исключением расходов продавца на&nbsp;доставку от&nbsp;потребителя
              возвращенного товара, не&nbsp;позднее чем через 10&nbsp;дней с&nbsp;даты предъявления покупателем
              соответствующего требования.
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Возврат товара ненадлежащего качества</div>
            <div className={styles.staticPageText}>
              В&nbsp;случае если покупателю передается товар с&nbsp;нарушением условий, касающихся количества,
              ассортимента, качества, комплектности, тары&nbsp;и (или) упаковки товара, покупатель может{' '}
              <span className={`${styles.staticPageText} ${styles.heavy}`}>
                не&nbsp;позднее 20&nbsp;дней после получения товара известить продавца об&nbsp;этих нарушениях.
              </span>
            </div>
            <div className={`${styles.staticPageText}`}>
              Покупатель также вправе предъявить требования к&nbsp;продавцу в&nbsp;отношении недостатков товара, если
              они обнаружены{' '}
              <span className={`${styles.staticPageText} ${styles.heavy}`}>в&nbsp;течение гарантийного срока.</span>
            </div>
            <div className={styles.staticPageText}>
              Покупатель, которому продан товар ненадлежащего качества, если это не&nbsp;было оговорено продавцом,
              вправе по&nbsp;своему выбору потребовать:
            </div>
            <div className={styles.staticPageText}>
              a) безвозмездного устранения недостатков товара или возмещения расходов на&nbsp;их&nbsp;исправление
              покупателем или третьим лицом;
            </div>
            <div className={styles.staticPageText}>б) соразмерного уменьшения покупной цены;</div>
            <div className={styles.staticPageText}>
              в) замены на&nbsp;товар аналогичной марки (модели, артикула) или на&nbsp;такой&nbsp;же товар другой марки
              (модели, артикула) с&nbsp;соответствующим перерасчетом покупной цены. При этом в&nbsp;отношении технически
              сложных и&nbsp;дорогостоящих товаров эти требования покупателя подлежат удовлетворению в&nbsp;случае
              обнаружения существенных недостатков.
            </div>
            <div className={styles.staticPageText}>
              окупатель вместо предъявления требований вправе отказаться от&nbsp;исполнения договора и&nbsp;потребовать
              возврата уплаченной за&nbsp;товар суммы. По&nbsp;требованию продавца и&nbsp;за&nbsp;его счет покупатель
              должен возвратить товар с&nbsp;недостатками.
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Для возврата товара необходимо:</div>
            <div className={styles.staticPageText}>
              1. Связаться с&nbsp;отделом рекламаций по&nbsp;эл. адресу:{' '}
              <a href="mailto:service@vobaza.ru" className={`${styles.staticPageText} ${styles.link}`}>
                service@vobaza.ru
              </a>{' '}
              или по&nbsp;телефону{' '}
              <a href="tel:+74951545483" className={`${styles.staticPageText} ${styles.link}`}>
                +7 (495) 154-54-83
              </a>{' '}
              для согласования даты возврата товара
            </div>
            <div className={styles.staticPageText}>
              2. В&nbsp;согласованное время привезти товар в&nbsp;заводской упаковке на&nbsp;склад по&nbsp;адресу: ул.
              Внуковская, 9, Одинцово, Московская обл., 143006. Режим работы ежедневно с&nbsp;9:00 до&nbsp;17:00. При
              себе иметь документы, подтверждающие покупку товара и&nbsp;паспорт для оформления заявления
              на&nbsp;возврат денег
            </div>
            <div className={styles.staticPageText}>3. Оформить заявление на&nbsp;возврат</div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>Порядок возврата денежных средств:</div>
            <div className={styles.staticPageText}>
              Перечисление денежных средств производится в&nbsp;течение 10&nbsp;календарных дней с&nbsp;момента
              оформления заявления на&nbsp;возврат денежных средств. Если Вы&nbsp;осуществляли оплату картой,
              то&nbsp;денежные средства автоматически будут возвращены на&nbsp;карту, использованную при оплате,
              в&nbsp;иных случаях&nbsp;&mdash; способом указанным в&nbsp;заявлении.
            </div>
            <div className={styles.staticPageText}>
              Для получения дополнительной информации&nbsp;Вы можете направить письмо по&nbsp;эл. адресу:{' '}
              <a href="mailto:service@vobaza.ru" className={`${styles.staticPageText} ${styles.link}`}>
                service@vobaza.ru
              </a>{' '}
              либо связаться с&nbsp;нами по&nbsp;телефону:{' '}
              <a href="tel:+74951545483" className={`${styles.staticPageText} ${styles.link}`}>
                +7 (495) 154-54-83
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
