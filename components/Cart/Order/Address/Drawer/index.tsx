import { FC } from 'react';

import Drawer from 'src/hoc/withDrawer';

import { IAddressFull } from 'src/models/IAddress';
import { UnauthorizedAddressForm } from 'components/Profile/Addresses/Form/Presenters/UnauthorizedForm';

type Props = {
  setOuterFieldValue: (name: string, value: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

const OrderAddressDrawer: FC<Props> = ({ isOpen = false, setOuterFieldValue, onClose }) => {
  const handleSubmit = (values: IAddressFull) => {
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
