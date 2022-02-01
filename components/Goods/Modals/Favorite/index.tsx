import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { useGoods } from '../../../../src/context/goods';
import ModalLayout from '../../../../src/hoc/withModal';

import { Button } from '@nebo-team/vobaza.ui.button';
import { Title } from '@nebo-team/vobaza.ui.title';
import { Icon } from '@nebo-team/vobaza.ui.icon';

const FavoriteModal: FC = () => {
  const { state, dispatch } = useGoods();
  const { favoritedGood } = state;

  const onClose = () => {
    dispatch({ type: 'closeFavoriteModal' });
  };

  return (
    <>
      {favoritedGood && (
        <ModalLayout onClose={onClose} isWide>
          <div className={styles.inlineModalContent}>
            <Title
              element="h1"
              className={`${styles.inlineModalTitle} ${styles.wide}`}
            >
              Товар добавлен в список отложенных товаров
            </Title>
            <div className={styles.favoriteModalItem}>
              <div className={styles.favoriteModalItemImage}>
                {favoritedGood.images ? (
                  <Image
                    src={favoritedGood.images[0].variants.original.url}
                    layout="fill"
                    objectFit="cover"
                    alt={favoritedGood.name}
                  />
                ) : (
                  <Icon name="ImagePlaceholder" />
                )}
              </div>
              <div className={styles.favoriteModalItemBlock}>
                <div className={styles.favoriteModalItemInfo}>
                  <div>
                    {/* TODO */}
                    <Link href="/">
                      <a className={styles.favoriteModalItemTitle}>
                        {favoritedGood.name}
                      </a>
                    </Link>
                  </div>
                  <div className={styles.favoriteModalItemPrice}>
                    <div className={styles.favoriteModalItemPriceBlock}>
                      {Intl.NumberFormat('ru-RU').format(
                        favoritedGood.discount_price
                          ? favoritedGood.discount_price
                          : favoritedGood.price
                      )}{' '}
                      ₽
                    </div>
                  </div>
                </div>
                <div className={styles.favoriteModalButtons}>
                  <Link href="/profile/wishlist" passHref>
                    <Button
                      onClick={onClose}
                      size="big"
                      text="Просмотреть список отложенных товаров"
                    />
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
export default FavoriteModal;
