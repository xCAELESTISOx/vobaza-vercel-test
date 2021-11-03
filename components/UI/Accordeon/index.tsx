import React, { FC, useRef, useState } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  title: string;
};

const Accordeon: FC<Props> = ({ children, title }) => {
  const refPanel = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleActive = () => {
    if (isLoading) return;
    setIsLoading(true);
    if (isOpen) {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      setTimeout(() => {
        refPanel.current.style.height = 0;
        setIsLoading(false);
      }, 100);
    } else {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      setTimeout(() => {
        refPanel.current.style.height = 'auto';
        setIsLoading(false);
      }, 400);
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordeonBlock}>
      <div className={styles.accordeon} onClick={toggleActive}>
        <div className={styles.accordeonTitle}>{title}</div>
        <div
          className={`${styles.accordeonArrow} ${
            isOpen && styles.accordeonArrowActive
          }`}
        >
          <Icon name="SmallArrowDown" />
        </div>
      </div>
      <div className={styles.accordeonPanel} ref={refPanel}>
        {children}
      </div>
    </div>
  );
};

export default Accordeon;
