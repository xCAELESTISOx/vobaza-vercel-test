import type { GetServerSideProps, NextPage } from 'next';

import OrderPaymentInfo from 'components/OrderPaymentInfo';

import { api } from 'app/api';

const formatter = Intl.NumberFormat('ru-RU');

interface IProps {
  amount: number;
  order_number: string;
}

const SuccessPaymentPage: NextPage<IProps> = ({ amount, order_number }) => {
  const formatedAmount = formatter.format(amount / 100);

  return <OrderPaymentInfo text={`Сумма ${formatedAmount} руб. по заказу №${order_number}\nуспешно оплачена`} />;
};

export default SuccessPaymentPage;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  try {
    const res = await api.getOrderPaymentResult(ctx.query.orderId as string);

    return { props: res.data.data };
  } catch (err) {
    console.error(err.response.data);
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
};
