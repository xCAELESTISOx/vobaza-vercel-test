import { FC } from 'react';
import Link from 'next/link';

import { Title } from '@nebo-team/vobaza.ui.title/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import ModalLayout from '../../../src/hoc/withModal';

import styles from '../../../styles/modules/inline-modal.module.scss';

interface Props {
  title?: string;
  description?: string;
  onClose?: () => void;
}

const CartItemChangeModal: FC<Props> = ({ description, title, onClose }) => {
  return (
    <ModalLayout onClose={onClose}>
      <div className={styles.inlineModal}>
        <div className={styles.inlineModalContent}>
          <Title element="h2" className={styles.inlineModalTitle}>
            {title || 'Количество товаров к корзине изменилось'}
          </Title>
          <p className={styles.inlineModalText}>
            {description || 'Некоторые товары более не доступны и удалены из корзины'}
          </p>
          <Link href="/cart">
            <a>
              <Button className={styles.inlineModalItem} text="В Корзину" size="big" isFullScreen onClick={onClose} />
            </a>
          </Link>
        </div>
      </div>
    </ModalLayout>
  );
};
export default CartItemChangeModal;
