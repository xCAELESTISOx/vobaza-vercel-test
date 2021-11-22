import React, { FC, useRef } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { useCollapse } from '../../../src/hooks/useCollapse';

type Props = {
  title: string;
  className?: any;
};

const ProductInfoAccordion: FC<Props> = ({ children, title, className }) => {
  const refPanel = useRef(null);
  const [isOpen, toggleOpen] = useCollapse(refPanel);

  return (
    <div className={`${styles.accordionBlock} ${className}`}>
      <div
        className={isOpen ? styles.accordionActive : styles.accordion}
        onClick={toggleOpen as any}
      >
        <div className={styles.accordionTitle}>{title}</div>
        <div className={styles.accordionArrow}>
          <Icon name="SmallArrowDown" />
        </div>
      </div>
      <div className={styles.accordionPanel} ref={refPanel}>
        <div className={styles.accordionPanelContent}>{children}</div>
      </div>
    </div>
  );
};

export { ProductInfoAccordion };
