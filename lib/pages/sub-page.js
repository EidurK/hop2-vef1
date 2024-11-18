import { renderNavigation } from '../components/navigation.js';
import { el } from '../element.js';
import { fetcher } from '../fetcher.js';

export async function renderSubpage(root, indexJson, type){
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;

  if(indexJson.navigation.find((i) => i.type === type)){
    foundType = type;
  }

  let mainElement;

  if(!foundType){
    mainElement = el('main', {}, el('p', {}, 'not found'));
  }else{
    const contentJsonFile = `data/${foundType}/index.json`;
    const contentJson = await fetcher(contentJsonFile);

    const content = contentJson.content;

    const contentElement = document.createElement('div');
    for(const item of content){
      const itemElement = el(
        'section', 
        {class: item.type},
        el('h1', {}, item.title),
        el('p', {}, item.text)
      )
    }
  }
}
