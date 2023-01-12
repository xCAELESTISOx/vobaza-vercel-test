import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { IGood } from 'entities/products/model/IGood';

import ModalLayout from '../../../../src/hoc/withModal';
import PlaceholderImage from 'assets/images/placeholder.png';
import { getImageVariantProps } from 'shared/lib/images';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { useSelector } from 'shared/lib/hooks/useSelector';
import { closeCartModal, setCartError } from 'src/store/goods';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Title } from '@nebo-team/vobaza.ui.title/dist';
import CartItemChangeModal from '../../../../components/Cart/Modal/CartItemChangeModal';

import styles from './styles.module.scss';

const CartModal: FC = () => {
  const cartGood = useSelector((state) => state.goods.cartGood) as IGood;
  const cartError = useSelector((state) => state.goods.cartError);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeCartModal());
  };
  const onCloseError = () => {
    dispatch(setCartError(false));
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
                    <Link href={`/product/${cartGood.slug}`} passHref>
                      <a className={styles.favoriteModalItemTitle} target="_blank">
                        {cartGood.seo?.page_name || cartGood.name}
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
export { CartModal };
