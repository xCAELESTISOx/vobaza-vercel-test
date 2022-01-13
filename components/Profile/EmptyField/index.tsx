import { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  text: string;
};

const profileEmptyField: FC<Props> = ({ text }) => {
  return <div className={styles.profileEmptyField}>{text}</div>;
};
export default profileEmptyField;
