import { FC } from 'react';

import Drawer from 'src/hoc/withDrawer';
import { UnauthorizedAddressForm } from 'widgets/profile';

import type { IAddressFull } from 'src/models/IAddress';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setOuterFieldValue: (name: string, value: any) => void;
};

const OrderAddressDrawer: FC<Props> = ({ isOpen = false, setOuterFieldValue, onClose }) => {
  const handleSubmit = async (values: IAddressFull) => {
    try {
      setOuterFieldValue('address', values);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Drawer title="Адрес" isOpen={isOpen} onClose={onClose} isFullHeight>
      <UnauthorizedAddressForm onSubmit={handleSubmit} inline />
    </Drawer>
  );
};
export default OrderAddressDrawer;
