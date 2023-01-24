import Link from 'next/link';

import styles from 'app/styles/PartnershipComplete.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Спасибо за обращение!',
    href: '/apply-for-vender/complete',
  },
];

export default function Cart() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <div className={styles.checkoutComplete}>
          <div className={styles.checkoutCompleteIcon}>
            <Icon name="SmallLogo" />
          </div>
          <h1 className={styles.checkoutCompleteTitle}>Спасибо за обращение!</h1>
          <div className={styles.checkoutCompleteText}>
            Ваше обращение получено. Наш представитель свяжется с вами в ближайшее время.
          </div>
          <Link href="/">
            <a className={styles.checkoutCompleteButton}>
              <Button text="Вернуться на главную" size="big" isFullScreen />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
