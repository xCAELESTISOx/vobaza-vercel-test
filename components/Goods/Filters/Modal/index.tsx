import { FC } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox';
import { Button } from '@nebo-team/vobaza.ui.button';
import { RangeBlock } from '@nebo-team/vobaza.ui.range';
import Accordeon from '../../../UI/Accordeon';

type Props = {
  isOpen: boolean;
  close: any;
};

const FiltersModal: FC<Props> = ({ isOpen, close }) => {
  const menuClickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.filtersModal} ${isOpen && styles.filtersModalOpen}`}
      onClick={close}
    >
      <div className={styles.filtersContent} onClick={menuClickHandler}>
        <div className={styles.filterHeader}>
          <div className={styles.filtersClose} onClick={close}>
            <Icon name="Cross" />
          </div>
          <div className={styles.filtersTitle}>Сортировка и фильтры </div>
        </div>
        <div className={styles.filtersBlock}>
          <Accordeon title="Цена" className={styles.filtersAccordeon}>
            <RangeBlock max={264300} values={[0, 264300]} />
          </Accordeon>
          <Accordeon title="Комната" className={styles.filtersAccordeon}>
            <InputCheckbox
              variation="secondary"
              label="Для прихожей"
              onChange={() => {}}
            />
            <InputCheckbox
              variation="secondary"
              label="Для спальни"
              onChange={() => {}}
            />
            <InputCheckbox
              variation="secondary"
              label="Для гостиной"
              onChange={() => {}}
            />
            <InputCheckbox
              variation="secondary"
              label="Для офиса"
              onChange={() => {}}
            />
          </Accordeon>
        </div>
        <div className={styles.filtersButtons}>
          <Button text="Показать все" isFullScreen onClick={close}></Button>
          <Button text="Очистить фильтры" isFullScreen onClick={close}></Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
