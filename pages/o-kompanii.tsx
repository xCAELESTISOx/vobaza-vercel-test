import Image from 'next/image';

import styles from '../styles/StaticPages.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'О Компании',
    href: '/o-kompanii',
  },
];

export default function About() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>О компании</h1>
          <div className={styles.staticPageImage}>
            <Image
              src="/vb-company.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              Перейти грань привычного и&nbsp;попробовать новое&nbsp;&mdash;
              &laquo;ВоБаза&raquo;.
            </div>
            <div className={styles.staticPageText}>
              &laquo;ВоБаза&raquo;&nbsp;&mdash; компания, основанная
              2020&nbsp;году, когда пандемия коронавируса вставляла палки
              в&nbsp;колеса существованию ресторанов, баров и&nbsp;кафе. Из-за
              нее в&nbsp;тяжелом состоянии оказались сотни фирм, заболели целые
              сферы бизнеса. Это бедствие сметало все на&nbsp;своем пути,
              но&nbsp;и&nbsp;открывало новые и&nbsp;не&nbsp;протоптанные дороги.
            </div>
            <div className={styles.staticPageText}>
              Нашим вдохновением послужила фраза Уинстона Черчилля: &laquo;Любой
              кризис&nbsp;&mdash; это новые возможности&raquo;. Наступило время
              действий. Сидеть под деревом в&nbsp;ожидании волшебного яблока,
              которое упадет на&nbsp;голову и&nbsp;осенит идеей беспроигрышного
              стартапа&nbsp;&mdash; это не&nbsp;про нас. Команда ВоБаза решила
              заняться тем, в&nbsp;чем действительно хороша. Сочетание передовых
              технологий, любви к&nbsp;своему делу и&nbsp;желания сделать вашу
              жизнь лучше, позволило нам создать прорыв в&nbsp;сфере мебельного
              бизнеса.
            </div>
            <div className={styles.staticPageText}>
              Мы&nbsp;&mdash; IT-компания и&nbsp;платформа всех товаров для дома
              в&nbsp;одном месте. Главная фишка&nbsp;&mdash; сервис, который
              учитывает желания покупателей и&nbsp;основывается на&nbsp;опыте
              предшественников. Вакцина в&nbsp;сфере продажи товаров для дома,
              офиса и&nbsp;дачи найдена.
            </div>
            <div className={styles.staticPageText}>
              Хотите окружить себя уютом, сделать быт более комфортным,
              не&nbsp;подвергая себя риску заболеть, или&nbsp;же переплатить
              за&nbsp;дополнительные услуги? Мы&nbsp;тоже.
            </div>
            <div className={styles.staticPageText}>
              В&nbsp;вашем распоряжении платформа &laquo;ВоБаза&raquo;
              с&nbsp;ассортиментом товаров, который тщательно подбирается
              и&nbsp;постоянно пополняется. Собственный контакт-центр
              и&nbsp;сервисная служба&nbsp;&mdash; помогут
              и&nbsp;проконсультируют по&nbsp;всем вопросам: от&nbsp;выбора
              цвета до&nbsp;возврата товара. И, вишенка
              на&nbsp;торте&nbsp;&mdash; доставка и&nbsp;сборка заказа
              в&nbsp;день оформления.
            </div>
            <div className={styles.staticPageText}>
              Помимо этого, мы&nbsp;сделали интерфейс сайта интуитивно
              понятным&nbsp;и, добавили возможность рассмотреть понравившиеся
              модели в&nbsp;режиме дополненной реальности, чтобы точно понять,
              впишется диван или шкаф в&nbsp;интерьер или нет.
            </div>
            <div className={styles.staticPageText}>
              Мы&nbsp;сделали упор на&nbsp;безопасность и&nbsp;комфорт
              в&nbsp;приобретении товаров, избегая ошибок прошлого
              и&nbsp;внедряя новые технологии.
            </div>
            <div className={styles.staticPageSubTitle}>
              Вчера мы&nbsp;создали платформу, сегодня создаем ваши улыбки,
              завтра создадим историю.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
