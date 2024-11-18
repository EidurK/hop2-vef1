import { el } from '../element.js';
import { fetcher } from '../fetcher.js';

import { renderLectures } from '../components/lectures.js';
import { renderKeywords } from '../components/keywords.js';
import { renderQuestions } from '../components/questions.js';


export async function renderContentPage(root, indexJson, params) {
  const type = params.get('type');
  const content = params.get('content');
  const contentJson = await fetcher(`data/${type}/${content}.json`);



  const headerElement = el('header', {}, el('h1', {}, indexJson.title));


  const contentElement = el('div',{});
  switch(content){
    case "lectures":
      contentElement.appendChild(await renderLectures(contentJson));
      break;
    case "keywords":
      contentElement.appendChild(await renderKeywords(contentJson));
      break;
    case "questions":
      contentElement.appendChild(await renderQuestions(contentJson));
      break;
  }

  const mainElement = el(
    'main',
    {},
    el(
      'section',
      {},
      el('p',{},indexJson.description),
      contentElement,
    ),
  );
  root.appendChild(headerElement);
  root.appendChild(mainElement);
}
