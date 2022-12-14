import React from 'react';
import styles from './styles.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloaderWrap}>
      <div className={styles.preloader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
