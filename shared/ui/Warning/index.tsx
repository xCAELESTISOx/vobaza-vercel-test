import React, { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const Warning: FC<Props> = ({ children }) => <div className={styles.warningBlock}>{children}</div>;

export default Warning;
