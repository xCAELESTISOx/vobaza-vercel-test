import { FC } from 'react';

import { IGoodCompare } from 'src/models/IGood';
import { AttributeDataType, IAttributeCompare } from 'src/models/IAttributes';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

type Props = {
  attributes: IAttributeCompare[];
  goods: IGoodCompare[];
  removedAttributes: any[];
  removeAttribute: (id) => void;
};

const renderItem = (data_type: keyof typeof AttributeDataType, value) => {
  switch (data_type) {
    case 'BOOLEAN':
      return value ? 'Да' : 'Нет';
    case 'MANY_FROM_MANY':
      return value
        ? value.map((item) => (
            <div key={item}>
              <span className={`${styles.compareListTableCheckbox} ${value ? styles.active : ''}`}>
                <Icon name="Checkmark" />
              </span>
              {item}
            </div>
          ))
        : '—';
    case 'COLOR':
      return value ? value[0].value : '—';
    case 'DATE':
      () => {
        const date = new Date(value);
        return value ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : '—';
      };
      break;
    default:
      return value || '—';
  }
};

const CompareListTable: FC<Props> = ({ attributes, goods, removedAttributes, removeAttribute }) => {
  return (
    <div className={styles.compareListTable}>
      {attributes.map((attribute) => {
        if (removedAttributes.find((item) => item.id === attribute.id)) return null;
        else
          return (
            <div key={attribute.id} className={styles.compareListTableRow}>
              <div className={styles.compareListTableTitle}>
                <strong>
                  {attribute.name}:
                  <Icon
                    name="Trash"
                    onClick={() => {
                      removeAttribute(attribute);
                    }}
                  />
                </strong>
              </div>
              {goods.map((item) => (
                <div key={item.id} className={styles.compareListTableItem}>
                  <div className={styles.compareListTableValue}>
                    {renderItem(attribute.data_type, item.attributes_value[attribute.id])}
                  </div>
                </div>
              ))}
            </div>
          );
      })}
    </div>
  );
};
export default CompareListTable;
