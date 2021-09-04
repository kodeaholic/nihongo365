import { Furigana } from 'gem-furigana';
export const furiganaHTML = str => {
  const furigana = new Furigana(str);
  return furigana.ReadingHtml;
};

export const rubyHtmlTransform = (rubyHtmlString, color = '') => {
  let pattern =
    color.length > 0
      ? `<div style="display: inline-block; color: ${color};"><div style="display: flex; flex-direction: column-reverse;">`
      : '<div style="display: inline-block;"><div style="display: flex; flex-direction: column-reverse;">';
  let result = rubyHtmlString.replace(/<ruby>/g, pattern);
  result = result.replace(/<rb>/g, '<div style="flex: 3; font-size: 16px;">');
  result = result.replace(/<rt>/g, '<div style="flex: 1; font-size: 8px;">');
  result = result.replace(/<\/ruby>/g, '</div></div>');
  result = result.replace(/<\/rb>/g, '</div>');
  result = result.replace(/<\/rt>/g, '</div>');
  result = `<div id="id" style="font-size: 16px !important; display: flex; flex-direction: row;">${result}</div>`;
  //   const xml = result;
  //   const doc = new DOMParser().parseFromString(xml);
  //   const nodes = select(doc, ".//div[contains(@id,'id')]/text()");
  //   console.log(nodes);
  return result;
};
