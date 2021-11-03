import React, { FC } from 'react';
import GoodsCard from '../Card';

import styles from './styles.module.scss';

import tmpImg1 from './tmp/blog1.jpg';
import tmpImg2 from './tmp/blog2.jpg';
import tmpImg3 from './tmp/blog3.jpg';
import tmpImg4 from './tmp/blog4.jpg';

const categories = [
  {
    title: 'Пять шагов к скандинавскому стилю',
    date: '16 Июл 2021',
    href: '/pyat-shagov-k-skandinavskomu-stilyu',
    image: tmpImg1,
  },
  {
    title: 'Как охладить квартиру летом без кондиционера',
    date: '13 Июл 2021',
    href: '/kak-ohladit-kvartiru-letom-bez-kondicionera',
    image: tmpImg2,
  },
  {
    title: '5 важных советов о том, как подготовиться к переезду своими силами',
    date: '09 Июл 2021',
    href: '/5-vazhnyh-sovetov-o-tom-kak-podgotovitsya-k-pereezdu-svoimi-silami',
    image: tmpImg3,
  },
  {
    title: 'Выбираем зеркала для разных комнат',
    date: '06 Июл 2021',
    href: '/vybiraem-zerkala-dlya-raznyh-komnat',
    image: tmpImg4,
  },
];

const GoodsList: FC = () => {
  return (
    <div className="container">
      <div className={styles.goodsList}>
        {categories.map((good) => (
          <GoodsCard key={good.title} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
