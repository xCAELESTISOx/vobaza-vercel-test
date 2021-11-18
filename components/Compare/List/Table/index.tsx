import { FC } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  features: any[];
  items: number;
  removedFeatures: any[];
  removeFeature: (value) => void;
};

const CompareListTable: FC<Props> = ({
  features,
  items,
  removedFeatures,
  removeFeature,
}) => {
  return (
    <div className={styles.compareListTable}>
      {features.map((feature) => {
        if (removedFeatures.includes(feature.title)) return <> </>;
        else
          return (
            <div key={feature.title} className={styles.compareListTableRow}>
              <div className={styles.compareListTableTitle}>
                <strong>
                  {feature.title}:
                  <Icon
                    name="Trash"
                    onClick={() => {
                      removeFeature(feature.title);
                    }}
                  />
                </strong>
              </div>
              {[...Array(items)].map((item) => (
                <div key={item} className={styles.compareListTableItem}>
                  {feature.values.map((value) => (
                    <div key={value} className={styles.compareListTableValue}>
                      {feature.isBool && (
                        <span
                          className={`${styles.compareListTableCheckbox} ${
                            value ? styles.active : ''
                          }`}
                        >
                          <Icon name="Checkmark" />
                        </span>
                      )}
                      {value || feature.isBool ? value : '-'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
      })}
    </div>
  );
};
export default CompareListTable;
