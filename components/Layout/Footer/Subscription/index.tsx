import React, { FC, useState } from 'react';

import { api } from '../../../../assets/api';

import Link from 'next/link';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import SuccessModal from './SuccessModal';

import styles from './styles.module.scss';

export function checkEmail(value) {
  const patternEmail = new RegExp(
    /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  );
  return patternEmail.test(value);
}

const Subscription: FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccessSend, setSuccessSend] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const subscribeMailing = async () => {
    const isValid = checkEmail(email);

    if (!isValid) {
      setIsValidEmail(false);
      return;
    }

    setIsValidEmail(true);

    try {
      await api.subscribeMailing({ email });

      setSuccessSend(true);
      setEmail('');

      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement && activeElement.blur) activeElement.blur();
    } catch (error) {}
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);

    if (!isValidEmail) setIsValidEmail(true);
  };

  const handleKeyUp = (e: any) => {
    const isEnter = e.key === 'Enter' || e.code === 'Enter';

    if (isEnter) subscribeMailing();
  };

  return (
    <>
      {isSuccessSend && <SuccessModal onClose={() => setSuccessSend(false)} />}

      <div className={styles.subscription}>
        <div className={`${styles.subscriptionContainer} container`}>
          <div className={styles.subscriptionContent}>
            <div className={styles.subscriptionTitle}>
              Подпишитесь на&nbsp;рассылку и&nbsp;будьте в&nbsp;курсе наших
              новинок и&nbsp;акций!
            </div>
            <div className={styles.subscriptionText}>
              Подтверждаю согласие на&nbsp;рассылку и&nbsp;
              <Link href="/politika-obrabotki-dannyh">
                <a className={styles.subscriptionLink}>
                  обработку персональных данных
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.subscriptionInput}>
            <InputText
              name="subscription"
              label="Ваш e-mail"
              icon="ArrowRight"
              isColoredIcon
              isClickableIconWithValue
              value={email}
              error={!isValidEmail && 'Некорректный email'}
              onChange={handleChange}
              onClickIcon={subscribeMailing}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
