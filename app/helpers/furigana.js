import { Furigana } from 'gem-furigana';
export const furiganaHTML = str => {
  const furigana = new Furigana(str);
  return furigana.ReadingHtml;
};
