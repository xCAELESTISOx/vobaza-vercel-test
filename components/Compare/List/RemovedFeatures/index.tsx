import { FC, useState } from 'react';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';

type Props = {
  removedFeatures: any[];
  addFeatures: (value) => void;
};

const CompareListRemoveFeatures: FC<Props> = ({
  removedFeatures,
  addFeatures,
}) => {
  const [clickedFeatures, setClickedFeatures] = useState([]);

  const tmpToggleFeature = (value) => {
    if (clickedFeatures.includes(value)) {
      setClickedFeatures(
        clickedFeatures.filter((feature) => feature !== value)
      );
    } else {
      setClickedFeatures([...clickedFeatures, value]);
    }
  };

  return (
    <div className={styles.removedFeatures}>
      <h3 className={styles.removedFeaturesTitle}>Добавить характеристику </h3>
      <div className={styles.removedFeaturesList}>
        {removedFeatures.map((feature) => (
          <>
            <InputCheckbox
              key={feature}
              variation="secondary"
              label={feature}
              onChange={() => tmpToggleFeature(feature)}
            />
            &nbsp;&nbsp;&nbsp;
          </>
        ))}
      </div>
      <Button
        className={styles.removedFeaturesButton}
        color={'#bdc3c7'}
        text="Добавить"
        onClick={() => {
          addFeatures(clickedFeatures);
        }}
      />
    </div>
  );
};
export default CompareListRemoveFeatures;
