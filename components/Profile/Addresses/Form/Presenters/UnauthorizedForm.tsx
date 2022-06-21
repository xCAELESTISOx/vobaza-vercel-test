import React from 'react';

import type { IAddressFull } from 'src/models/IAddress';

import ProfileAddressesForm from '..';

const initialValues: IAddressFull = {
  address: '',
  entrance: '',
  floor: 1,
  intercom: '',
  is_default: false,
  elevator: 'NONE',
};

type Props = {
  inline?: boolean;
  onSubmit?: (values: IAddressFull) => void;
};

const UnauthorizedAddressForm = ({ onSubmit, inline }: Props) => {
  return <ProfileAddressesForm initialValues={initialValues} onSubmit={onSubmit} inline={inline} unauth />;
};

export { UnauthorizedAddressForm };
