export function num2str(n, textForms) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}

export const getFileSize = (size: number) => {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i];
};;