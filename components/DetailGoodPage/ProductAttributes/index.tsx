import React, { FC } from 'react';

import { AttributeDataType, IAttributeItem } from '../../../src/models/IAttributes';
import type { IAttributes } from '../../../src/models/IAttributes';

import styles from './styles.module.scss';

const renderStringValue = (value: any) => {
  return value;
};

const renderArrayValue = (value: any) => {
  if (!Array.isArray(value)) return null;

  return value.map((item) => (
    <div key={item} className={styles.attributeValueMultipleItem}>
      {item}
    </div>
  ));
};

const renderBooleanValue = (value: any) => {
  return value ? 'Да' : 'Нет';
};

const renderColorValue = (value: any) => {
  if (!Array.isArray(value)) return null;

  return value.map((item) => (
    <div key={item.value} className={styles.attributeValueMultipleItem}>
      {item.value}
    </div>
  ));
};

const renderDateValue = (value: any) => {
  try {
    const formatDate = new Date(value).toLocaleDateString();
    return formatDate;
  } catch (err) {
    console.error(err);
  }

  return null;
};

const attributeValueRenderersMap: Record<AttributeDataType, (value: any) => any> = {
  STRING: renderStringValue,
  INTEGER: renderStringValue,
  DECIMAL: renderStringValue,
  COLOR: renderColorValue,
  DATE: renderDateValue,
  BOOLEAN: renderBooleanValue,
  MANY_FROM_MANY: renderArrayValue,
  ONE_FROM_MANY: renderStringValue,
};

interface AttributeItemValue {
  type?: string;
  value?: any;
}

const AttributeItemValue: FC<AttributeItemValue> = (props) => {
  const { type, value } = props;

  const renderer = attributeValueRenderersMap[type];

  if (value === undefined || !renderer) return <>-</>;

  const component = renderer(value);

  return <div className={styles.attributeValue}>{component || <>-</>}</div>;
};

interface AttributeItem {
  data: IAttributeItem;
}

const AttributeItem: FC<AttributeItem> = ({ data }) => {
  return (
    <div className={styles.attributeItem}>
      <div className={styles.attributeTitle}>{data.attribute.name}:</div>
      <AttributeItemValue type={data.attribute.data_type} value={data.value} />
    </div>
  );
};

interface AttributesBlock {
  title?: string;
  attributes?: IAttributeItem[];
}

const AttributesBlock: FC<AttributesBlock> = (props) => {
  const { title, attributes } = props;

  return (
    <div className={styles.attributesBlock}>
      <div className={styles.attributesBlockTitle}>{title}</div>
      <div>
        {attributes &&
          attributes.map((item) => {
            return item.attribute.data_type === 'BOOLEAN' || item.value ? (
              <AttributeItem key={item.attribute.id} data={item} />
            ) : null;
          })}
      </div>
    </div>
  );
};

interface ProductAttributes {
  attributes: IAttributes;
}

const ProductAttributes: FC<ProductAttributes> = ({ attributes }) => {
  const { main, additional } = attributes;

  return (
    <div className={styles.container}>
      {Boolean(main.length) && <AttributesBlock title="Основные характеристики" attributes={main} />}
      {additional &&
        additional.map((block) => (
          <AttributesBlock
            key={block.category.id}
            title={`Характеристики: ${block.category.name}`}
            attributes={block.attributes}
          />
        ))}
    </div>
  );
};

export { ProductAttributes };
