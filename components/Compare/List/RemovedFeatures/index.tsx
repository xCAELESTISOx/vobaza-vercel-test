import { FC, Fragment, useState } from 'react';

import { IAttributeCompare } from 'src/models/IAttributes';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';

type Props = {
  removedAttributes: IAttributeCompare[];
  addAttribute: (value) => void;
};

const CompareListRemoveFeatures: FC<Props> = ({
  removedAttributes,
  addAttribute,
}) => {
  const [clickedAttributes, setClickedAttributes] = useState([]);

  const toggleAttribute = (value) => {
    if (clickedAttributes.includes(value)) {
      setClickedAttributes(
        clickedAttributes.filter((attribute) => attribute.id !== value.id)
      );
    } else {
      setClickedAttributes([...clickedAttributes, value]);
    }
  };

  const addAttributeHandler = () => {
    setClickedAttributes([]);
    addAttribute(clickedAttributes);
  };

  return (
    <div className={styles.removedAttributes}>
      <h3 className={styles.removedAttributesTitle}>
        Добавить характеристику{' '}
      </h3>
      <div className={styles.removedAttributesList}>
        {removedAttributes.map((attribute) => (
          <Fragment key={attribute.id}>
            <InputCheckbox
              variation="secondary"
              label={attribute.name}
              onChange={() => toggleAttribute(attribute)}
            />
            &nbsp;&nbsp;&nbsp;
          </Fragment>
        ))}
      </div>
      <Button
        className={styles.removedAttributesButton}
        variation="secondary"
        text="Добавить"
        onClick={addAttributeHandler}
        size="big"
      />
    </div>
  );
};
export default CompareListRemoveFeatures;
