import { IGood } from '../../src/models/IGood';

export default function normalizeGoods(goods: IGood[]) {
  return goods.map((good) => {
    return {
      ...good,
      price: good.price / 100,
      list_price: good.list_price ? good.list_price / 100 : null,
    };
  });
}
