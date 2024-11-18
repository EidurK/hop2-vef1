import { el } from '../element.js';
import { fetcher } from '../fetcher.js';

import { renderLectures } from '../components/lectures.js';

export async function renderContentPage(root, indexJson, params) {
  const type = params.get('type');
  const content = params.get('content');
  const contentJson = await fetcher(`data/${type}/${content}.json`);



  const headerElement = el('header', {}, el('h1', {}, indexJson.title));


  const mainElement = el(
    'main',
    {},
    el(
      'section',
      {},
      el('p',{},indexJson.description),
      el(
        'p',
        {},
        await renderLectures(contentJson),
      ),
    ),
  );
  root.appendChild(headerElement);
  root.appendChild(mainElement);
}
