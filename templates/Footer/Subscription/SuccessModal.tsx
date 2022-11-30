import { FC } from 'react';

import { Title } from '@nebo-team/vobaza.ui.title/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import ModalLayout from '../../../src/hoc/withModal';

import styles from 'styles/modules/inline-modal.module.scss';

interface Props {
  onClose?: () => void;
}

const SuccessModal: FC<Props> = ({ onClose }) => {
  return (
    <ModalLayout onClose={onClose}>
      <div className={styles.inlineModal}>
        <div className={styles.inlineModalContent}>
          <Title element="h2" className={styles.inlineModalTitle}>
            Поздравляем!
          </Title>
          <p className={styles.inlineModalText}>Ваш email добавлен в список рассылки</p>
          <Button className={styles.inlineModalItem} text="Спасибо" size="big" isFullScreen onClick={onClose} />
        </div>
      </div>
    </ModalLayout>
  );
};
export default SuccessModal;
