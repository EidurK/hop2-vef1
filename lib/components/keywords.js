
import { el } from '../element.js';

export async function renderKeywords(contentJson){
  const mainElement = document.createElement('div');

  const keywords = contentJson.keywords;
  for(const keyword of keywords){
    const titleString = keyword.english? `${keyword.title} (e. ${keyword.english})`: `${keyword.title}`;
    mainElement.appendChild(
      el('div',{class: 'keyword'},
        el('h3', {}, titleString),
        el('p', {}, keyword.content),
      )
    )
  }

  return mainElement;
}
