import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from 'app/styles/CheckoutComplete.module.scss';

interface IProps {
  children: ReactNode;
}

const SuccessfulSend = ({ children }: IProps) => (
  <div>
    <div className="container">
      <div className={styles.checkoutComplete}>
        <div className={styles.checkoutCompleteIcon}>
          <Icon name="SmallLogo" />
        </div>
        {children}
        <Link href="/">
          <a className={styles.checkoutCompleteButton}>
            <Button text="Вернуться на главную" size="big" isFullScreen />
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default SuccessfulSend;
