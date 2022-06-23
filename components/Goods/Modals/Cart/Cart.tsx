import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { useGoods } from '../../../../src/context/goods';
import ModalLayout from '../../../../src/hoc/withModal';
import PlaceholderImage from 'assets/images/placeholder.png';
import { getImageVariantProps } from 'assets/utils/images';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Title } from '@nebo-team/vobaza.ui.title/dist';
import CartItemChangeModal from '../../../Cart/Modal/CartItemChangeModal';

const CartModal: FC = () => {
  const { state, dispatch } = useGoods();
  const { cartGood, cartError } = state;

  const onClose = () => {
    dispatch({ type: 'closeCartModal' });
  };
  const onCloseError = () => {
    dispatch({ type: 'setCartError', payload: false });
  };

  return (
    <>
      {cartError && (
        <CartItemChangeModal
          title="Данный товар закончился"
          description="Товар более не доступен, выберите другой"
          onClose={onCloseError}
        />
      )}
      {cartGood && (
        <ModalLayout onClose={onClose} isWide>
          <div className={styles.inlineModalContent}>
            <Title element="h1" className={`${styles.inlineModalTitle} ${styles.wide}`}>
              Товар добавлен в корзину
            </Title>
            <div className={styles.favoriteModalItem}>
              <div className={styles.favoriteModalItemImage}>
                {cartGood.images || cartGood.main_image ? (
                  cartGood.images ? (
                    <Image
                      {...getImageVariantProps(cartGood.images[0].variants, 'medium')}
                      objectFit="contain"
                      alt={cartGood.name}
                    />
                  ) : (
                    <Image
                      {...getImageVariantProps(cartGood.main_image.variants, 'medium')}
                      objectFit="contain"
                      alt={cartGood.name}
                    />
                  )
                ) : (
                  <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
                )}
              </div>
              <div className={styles.favoriteModalItemBlock}>
                <div className={styles.favoriteModalItemInfo}>
                  <div onClick={onClose}>
                    <div className={styles.favoriteModalItemSku}>Артикул: {cartGood.sku}</div>
                    <Link href={`/product/${cartGood.slug}-${cartGood.sku}`}>
                      <a className={styles.favoriteModalItemTitle}>{cartGood.name}</a>
                    </Link>
                  </div>
                  <div className={styles.favoriteModalItemPrice}>
                    <div className={styles.favoriteModalItemPriceBlock}>
                      {Intl.NumberFormat('ru-RU').format(cartGood.price)} ₽
                    </div>
                  </div>
                </div>
                <div className={styles.favoriteModalButtons}>
                  <Button variation="secondary" onClick={onClose} size="big" text="Продолжить покупки" isFullScreen />
                  <Link href="/checkout">
                    <a>
                      <Button onClick={onClose} size="big" text="Перейти к оформлению" isFullScreen />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </>
  );
};
export default CartModal;
