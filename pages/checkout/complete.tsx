import { useRouter } from 'next/router';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import SuccessfulSend from 'shared/ui/SuccessfulSend';

import styles from 'app/styles/CheckoutComplete.module.scss';

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
      <SuccessfulSend>
        <h1 className={styles.checkoutCompleteTitle}>Спасибо за заказ!</h1>
        <div className={styles.checkoutCompleteText}>
          Ваш заказ &#8470;&nbsp;{query.order_id || 0} успешно оформлен. Скоро с вами свяжется менеджер для
          подтверждения
        </div>
      </SuccessfulSend>
    </div>
  );
}
