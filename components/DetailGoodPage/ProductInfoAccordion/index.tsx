import React, { FC, useRef } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { useCollapse } from '../../../src/hooks/useCollapse';

type Props = {
  title: string;
  className?: any;
  duration?: number;
  autoDuration?: boolean;
};

const ProductInfoAccordion: FC<Props> = ({
  children,
  title,
  className,
  duration = 200,
  autoDuration = false,
}) => {
  const refPanel = useRef(null);
  const [isOpen, toggleOpen] = useCollapse(refPanel, {
    duration,
    autoDuration,
  });

  return (
    <div className={styles.accordionBlock}>
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
