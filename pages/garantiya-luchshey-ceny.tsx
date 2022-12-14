import styles from 'app/styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Гарантия лучшей цены',
    href: '/garantiya-luchshey-ceny',
  },
];

export default function BestPriceGuaranteed() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Гарантия лучшей цены</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageText}>
              ВоБаза&nbsp;&mdash; портал, где производители мебели размещают свои товары напрямую, минуя посредников
              и&nbsp;дистрибьюторов. Производители сами выставляют цены и&nbsp;следят за&nbsp;их&nbsp;актуальностью.
              Именно поэтому мы&nbsp;можем гарантировать, что цены на&nbsp;vobaza.ru самые выгодные.
            </div>
            <div className={styles.staticPageText}>
              Если цена на&nbsp;другом сайте окажется ниже, чем на&nbsp;vobaza.ru, мы&nbsp;снизим цену и&nbsp;продадим
              по&nbsp;цене другого сайта при выполнении следующих условий:
            </div>
            <ol>
              <li className={styles.staticPageText}>
                Цена на&nbsp;другом сайте* на&nbsp;данный товар актуальна, товар есть в&nbsp;наличии и&nbsp;продавец
                готов выполнить доставку;
              </li>
              <li className={styles.staticPageText}>
                Товар произведён на&nbsp;той&nbsp;же фабрике и&nbsp;в&nbsp;том&nbsp;же году, что представленный
                на&nbsp;портале ВоБаза, имеет идентичные характеристики, тот&nbsp;же срок гарантии и&nbsp;эксплуатации,
                не&nbsp;является бракованным, не&nbsp;имеет дефектов;
              </li>
              <li className={styles.staticPageText}>
                Стоимость товара с&nbsp;учётом доставки не&nbsp;выше стоимости с&nbsp;доставкой на&nbsp;портале ВоБаза.
              </li>
            </ol>
            <div className={styles.staticPageText}>
              *В&nbsp;рамках акции мы&nbsp;сравниваем цену данного товара с&nbsp;ценами на&nbsp;сайте производителя
              и&nbsp;с&nbsp;ценами данного товара на&nbsp;сайтах крупнейших продавцов мебели и&nbsp;товаров для дома:
              hoff.ru, divan.ru, pm.ru, mebelvia.ru, stolplit.ru, zvet.ru, moon-trade.ru, shatura.com, divano.ru,
              mebelgroup.com, meb-online.ru, mebel.ru, stokdivanov.ru, mnogomebeli.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
