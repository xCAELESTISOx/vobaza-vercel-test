import { IAttributes } from "src/models/IAttributes";

export const prepareProductAttributes = (attrs: IAttributes) => {
  const attributes = { ...attrs };

  const attrAdditional = attributes.additional.filter((item) => {
    const additionalAttrs =
      item.attributes?.length > 0
        ? item.attributes.filter((attr) => {
            return attr.value;
          })
        : item.attributes;

    item.attributes = additionalAttrs;
    return item.attributes.length > 0;
  });

  const attrMain = attributes.main.filter((item) => {
    return item.value;
  });

  return { ...attributes, additional: attrAdditional, main: attrMain };
};
