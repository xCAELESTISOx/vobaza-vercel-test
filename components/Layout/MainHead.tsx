import React, { FC } from "react";
import Head from "next/head";

const MainHead: FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        Интернет-магазин мебели «ВоБаза» - гипермаркет мебели и товаров для дома
        в Москве
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={""}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
      />
    </Head>
  );
};

export { MainHead };
