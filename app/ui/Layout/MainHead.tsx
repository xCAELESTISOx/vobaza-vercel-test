import React, { FC } from 'react';
import Head from 'next/head';

const MainHead: FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        Интернет-магазин мебели «ВоБаза» - гипермаркет мебели и товаров для дома
        в Москве
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export { MainHead };
