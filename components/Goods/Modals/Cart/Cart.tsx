import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { useGoods } from '../../../../src/context/goods';
import ModalLayout from '../../../../src/hoc/withModal';

import { Button } from '@nebo-team/vobaza.ui.button';
import { Title } from '@nebo-team/vobaza.ui.title';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import CartItemChangeModal from '../../../Cart/Modal/CartItemChangeModal';
import PlaceholderImage from 'assets/images/placeholder.png';

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
      {cartError && <CartItemChangeModal onClose={onCloseError} />}
      {cartGood && (
        <ModalLayout onClose={onClose} isWide>
          <div className={styles.inlineModalContent}>
            <Title
              element="h1"
              className={`${styles.inlineModalTitle} ${styles.wide}`}
            >
              Товар добавлен в корзину
            </Title>
            <div className={styles.favoriteModalItem}>
              <div className={styles.favoriteModalItemImage}>
                {cartGood.images || cartGood.main_image ? (
                  cartGood.images ? (
                    <Image
                      src={cartGood.images[0].variants.medium.url}
                      width={cartGood.images[0].variants.medium.meta.width}
                      height={cartGood.images[0].variants.medium.meta.height}
                      objectFit="contain"
                      alt={cartGood.name}
                    />
                  ) : (
                    <Image
                      src={cartGood.main_image.variants.medium.url}
                      width={cartGood.main_image.variants.medium.meta.width}
                      height={cartGood.main_image.variants.medium.meta.height}
                      objectFit="contain"
                      alt={cartGood.name}
                    />
                  )
                ) : (
                  <Image
                    src={PlaceholderImage}
                    objectFit="contain"
                    alt=""
                    unoptimized
                  />
                )}
              </div>
              <div className={styles.favoriteModalItemBlock}>
                <div className={styles.favoriteModalItemInfo}>
                  <div onClick={onClose}>
                    <div className={styles.favoriteModalItemSku}>
                      Артикул: {cartGood.sku}
                    </div>
                    <Link
                      href={`/product/${cartGood.slug}_${cartGood.id}_${cartGood.sku}`}
                    >
                      <a className={styles.favoriteModalItemTitle}>
                        {cartGood.name}
                      </a>
                    </Link>
                  </div>
                  <div className={styles.favoriteModalItemPrice}>
                    <div className={styles.favoriteModalItemPriceBlock}>
                      {Intl.NumberFormat('ru-RU').format(cartGood.price)} ₽
                    </div>
                  </div>
                </div>
                <div className={styles.favoriteModalButtons}>
                  <Button
                    variation="secondary"
                    onClick={onClose}
                    size="big"
                    text="Продолжить покупки"
                    isFullScreen
                  />
                  <Link href="/checkout">
                    <a>
                      <Button
                        onClick={onClose}
                        size="big"
                        text="Перейти к оформлению"
                        isFullScreen
                      />
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
