import Link from 'next/link';

import styles from 'app/styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

import VkIcon from '../templates/Footer/Credentials/VkIcon';
import SKIcon from '../templates/Footer/Credentials/SKIcon';
// import InstaIcon from '../templates/Footer/Credentials/InstaIcon';
// import FbIcon from '../templates/Footer/Credentials/FbIcon';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Контакты',
    href: '/kontakty',
  },
];

export default function Contacts() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={`${styles.staticPageContent} ${styles.contactsContent}`}>
          <div>
            <h1 className={styles.staticPageTitle}>Контакты</h1>
            <div className={styles.staticPageInfo}>
              <a href="tel:+74951725818" className={styles.staticPageSubTitle}>
                +7(495) 172-58-18
              </a>
              <div className={`${styles.staticPageText} ${styles.gray}`}>Звонок бесплатный</div>
              <div className={styles.staticPageText}>
                Специалисты клиентской поддержки принимают звонки с&nbsp;9:00 до&nbsp;21:00 без выходных
              </div>
            </div>
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Склад</div>
              <div className={styles.staticPageText}>
                143006&nbsp;Россия, Московская область, Одинцово, Внуковская улица, 9
              </div>
            </div>
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Главный офис</div>
              <div className={styles.staticPageText}>Россия, Московская область, Одинцово, Луговая улица, 10</div>
            </div>
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Реквизиты</div>
              <div className={styles.staticPageText}>
                Наименование организации: ООО &laquo;Вобаза&raquo; ИНН/КПП 6167198895/616701001&nbsp;ОГРН 1206100021863
                Юридический адрес: 344111, Ростовская обл., г. Ростов-на-Дону, ул. 50-летия Октября, д. 33/1,
                офис&nbsp;1
              </div>
            </div>
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Почта для партнеров</div>
              <div>
                <a href="mailto:partners@vobaza.ru" className={`${styles.staticPageText} ${styles.link}`}>
                  partners@vobaza.ru
                </a>
              </div>
            </div>
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Подпишитесь в&nbsp;социальных сетях</div>
              <div className={styles.contactsSocial}>
                {/* <a
                  href="https://www.facebook.com/vobaza.ru"
                  target="_blank"
                  className={styles.contactsSocialItem}
                  rel="noreferrer"
                >
                  <FbIcon />
                </a> */}
                <a
                  href="https://vk.com/vobaza_official"
                  target="_blank"
                  className={styles.contactsSocialItem}
                  rel="noreferrer"
                >
                  <VkIcon />
                </a>
                <a
                  href="https://navigator.sk.ru/orn/1123813"
                  target="_blank"
                  className={styles.contactsSocialItemWide}
                  rel="noreferrer"
                >
                  <SKIcon />
                </a>
                {/* <a
                  href="https://www.instagram.com/vobaza.ru/"
                  target="_blank"
                  className={styles.contactsSocialItem}
                  rel="noreferrer"
                >
                  <InstaIcon />
                </a> */}
              </div>
            </div>
          </div>
          <div>
            {/* <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Обратная связь</div>
              <div className={styles.staticPageText}>Если у&nbsp;вас возник вопрос&nbsp;&mdash; напишите нам</div>
              <Link href="/kontaktnaya-forma">
                <a className={styles.contactsButton}>
                  Написать <Icon name="ArrowRight" />
                </a>
              </Link>
            </div> */}
            <div className={styles.staticPageInfo}>
              <div className={`${styles.staticPageText} ${styles.bold}`}>Поставщикам</div>
              <div className={styles.staticPageText}>Узнайте подробные условия для сотрудничества</div>
              <Link href="/postavschikam-partneram">
                <a className={styles.contactsButton}>
                  Узнать подробности <Icon name="ArrowRight" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
