import Link from 'next/link';

import styles from '../../styles/CheckoutComplete.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import { useRouter } from 'next/router';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Ваш заказ принят',
    href: '/checkout/complete',
  },
];

export default function Cart() {
  const router = useRouter();
  const { query } = router;

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <div className={styles.checkoutComplete}>
          <div className={styles.checkoutCompleteIcon}>
            <Icon name="SmallLogo" />
          </div>
          <h1 className={styles.checkoutCompleteTitle}>Спасибо за заказ!</h1>
          <div className={styles.checkoutCompleteText}>
            Ваш заказ &#8470;&nbsp;{query.order_id || 0} успешно оформлен. Скоро с вами свяжется менеджер для подтверждения
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
