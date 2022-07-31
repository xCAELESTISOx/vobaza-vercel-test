import { IGood, IGoodCard } from '../../../src/models/IGood';

export default function normalizeGoods(goods: IGood[] | IGoodCard[]) {
  return goods.map((good) => ({
    ...good,
    price: good.price / 100,
    list_price: good.list_price ? good.list_price / 100 : null,
  }));
}
