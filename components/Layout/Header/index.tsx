import React, { FC } from 'react';
import SmallHeader from './Small';
import MainHeader from './Main';
import SubHeader from './Sub';

const Header: FC = () => {
  return (
    <header>
      <SmallHeader />
      <MainHeader />
      <SubHeader />
    </header>
  );
};

export default Header;
