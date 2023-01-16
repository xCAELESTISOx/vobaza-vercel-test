import React, { FC } from 'react';
import Tooltip from 'rc-tooltip';
import Image from 'next/image';
import Link from 'next/link';

import type { IVariantProduct } from 'entities/products';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  active: boolean;
  item: IVariantProduct & { tooltipText: string };
};

const ProductOptionsImage: FC<Props> = ({ item, active = false }) => {
  return (
    <Link href={`/product/${item.slug}`} passHref>
      <Tooltip placement="top" overlay={<span>{item.tooltipText}</span>}>
        <a className={`${styles.variant} ${active ? styles.variantActive : ''}`} title={item.slug}>
          <div className={styles.variantImg}>
            <Image
              src={item.main_image?.variants?.small?.url || PlaceholderImage}
              objectFit="contain"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
        </a>
      </Tooltip>
    </Link>
  );
};

export { ProductOptionsImage };
