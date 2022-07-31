import { ICollection, CollectionSize } from '../../../src/models/ICollection';

const CollectionSizeTable = {
  0: CollectionSize.SMALL,
  1: CollectionSize.SMALL,
  2: CollectionSize.MEDIUM,
  3: CollectionSize.LARGE,
}
export default function normalizeCollections(collections: ICollection[]) {
  if (collections.length < 4) {
    for (var i = 0; i < 4; i++) {
      if (collections[i] && collections[i].size !== CollectionSizeTable[i]) {
        collections.splice(i, 0, null)
      }
    }
  }

  return collections
}
