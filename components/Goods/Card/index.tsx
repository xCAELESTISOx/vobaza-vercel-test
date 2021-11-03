import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import tmpImg1 from './tmp/good1.jpg';

type Props = {
  good: object;
};

const GoodsCard: FC<Props> = ({ good }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLabel}>Экспресс-доставка</div>
        <div className={styles.cardIcon}>
          <Icon name="Bell" />
        </div>
      </div>
      <div className={styles.cardImage}>
        <Link href="/">
          <a>
            <Image src={tmpImg1} alt="" />
          </a>
        </Link>
      </div>
      <div className={styles.cardVariants}>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>
              <Image src={tmpImg1} alt="123" />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>
              <Image src={tmpImg1} alt="123" />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>
              <Image src={tmpImg1} alt="123" />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>
              <Image src={tmpImg1} alt="123" />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>
              <Image src={tmpImg1} alt="123" />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a>
            <div className={styles.cardVariant}>+8</div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default GoodsCard;
