
  const tagRegs = {
    strong: /(?<!\\)\*{2}(.*?)(?<!\\)\*{2}/gi,
    em: /(?<!\\)_{2}(.*?)(?<!\\)_{2}/gi,
    b: /(?<!\\)\*{1}(.*?)(?<!\\)\*{1}/gi,
    i: /(?<!\\)_{1}(.*?)(?<!\\)_{1}/gi,
  };

export const parseTagTitle = (text: string) => {
  const tagsEntries = Object.entries(tagRegs);
  const stringTitle = tagsEntries.reduce((acc, item) => {
    return acc.replace(item[1], `<${item[0]}>$1</${item[0]}>`);
  }, text).replace(/\\([*_])/gi, `$1`);

  return stringTitle;
};