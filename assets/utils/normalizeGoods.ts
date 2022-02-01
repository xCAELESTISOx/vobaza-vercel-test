import { IGood } from '../../src/models/IGood';

export default function normalizeGoods(goods: IGood[]) {
  return goods.map((good) => {
    return {
      ...good,
      price: good.price / 100,
      discount_price: good.discount_price ? good.discount_price / 100 : null,
    };
  });
}
