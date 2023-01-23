import React from 'react';

import { ProfileAddressesForm } from 'features/profile';

import type { IAddressFull } from 'src/models/IAddress';

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
