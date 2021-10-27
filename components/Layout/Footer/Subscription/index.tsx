import React, { FC, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';

const Subscription: FC = () => {
  const [email, setEmail] = useState('');
  return (
    <div className={styles.subscription}>
      <div className={`${styles.subscriptionContainer} container`}>
        <div className={styles.subscriptionContent}>
          <div className={styles.subscriptionTitle}>
            Подпишитесь на рассылку и будьте в курсе наших новинок и акций!
          </div>
          <div className={styles.subscriptionText}>
            Подтверждаю согласие на рассылку и{' '}
            <Link href="/politika-obrabotki-dannyh">
              <a className={styles.subscriptionLink}>
                обработку персональных данных
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.subscriptionInput}>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Ваш e-mail"
            name="subscription"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
