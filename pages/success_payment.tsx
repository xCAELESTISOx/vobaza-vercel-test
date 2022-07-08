import { useRouter } from "next/router";

import OrderPaymentInfo from "components/OrderPaymentInfo/OrderPaymentInfo";

export default function SuccessPaymentPage() {
  const router = useRouter();

  const orderId = router.query.order_id || ""
  return <OrderPaymentInfo text={`Заказ №${orderId} успешно оплачен`} />
}
