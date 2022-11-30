import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import React, { FC, useRef } from 'react';

import styles from './styles.module.scss';

type Props = {
  city: string;
  closeModal: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const CitySelectQuestionModal: FC<Props> = ({
  city,
  closeModal,
  onSubmit,
  onCancel,
}) => {
  const selectRef = useRef(null);
  useClickOutside(selectRef, () => closeModal());

  return (
    <div className={styles.citySelectModal} ref={selectRef}>
      <Icon
        name="Cross"
        className={styles.citySelectModalCross}
        onClick={closeModal}
      />
      <div className={styles.citySelectModalTitle}>
        Город определен верно? - {city}
      </div>
      <div className={styles.citySelectModalText}>
        От выбора зависит стоимость товара и доставки
      </div>
      <div className={styles.citySelectModalButtons}>
        <Button text="Да" onClick={onSubmit} />
        <Button
          text="Нет, выбрать другой"
          variation="secondary"
          onClick={onCancel}
        />
      </div>
    </div>
  );
};

export default CitySelectQuestionModal;
