export const compareArrays = (array1: any[], array2: any[], keyField?: string | number) => {
  if (!array1 || !array2) return false;

  if (array1.length !== array2.length) return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    if (array1[i][keyField] != array2[i][keyField]) return false;
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      if (!array1[i].equals(array2[i])) return false;
    } else if (array1[i] != array2[i] && !keyField) {
      return false;
    }
  }

  return true;
};
