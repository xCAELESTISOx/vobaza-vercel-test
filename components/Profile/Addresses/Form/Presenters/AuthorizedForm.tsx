import { api } from 'assets/api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ElevatorType, IAddressFull } from 'src/models/IAddress';
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
  address?: IAddressFull;
  onSubmit?: (values: IAddressFull) => void;
};

const AuthorizedAddressForm = ({ inline, address, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const saveAddress = async (values: IAddressFull) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = {
        ...values,
        is_default: values.is_default,
      };
      let newId;

      if (address) {
        await api.changeAddress(data, address.id);
      } else {
        const res = await api.setAddress(data);
        newId = res.data.data.id;
      }

      if (onSubmit) {
        onSubmit({
          id: newId,
          is_default: values.is_default,
          address: values.address,
          floor: +values.floor,
          elevator: (values.elevator as ElevatorType) || 'NONE',
          flat: +values.flat,
          entrance: values.entrance,
          intercom: values.intercom,
        });
      } else {
        router.push('/profile/address');
      }
    } catch (error) {
      const errs = error.response.data.errors;

      throw new Error(errs);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileAddressesForm initialValues={address ? address : initialValues} buttonText='Добавить' onSubmit={saveAddress} inline={inline} />
  );
};

export { AuthorizedAddressForm };