import { renderNavigation } from '../components/navigation.js';
import { el } from '../element.js';
import { fetcher } from '../fetcher.js';


function getDataURL(foundType, fileName){
  return `data/${foundType}/${fileName}`;
}

export async function renderSubpage(root, indexJson, params){

  const type = params.get('type');

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;

  if(indexJson.navigation.find((i) => i.slug === type)){
    foundType = type;
  }

  let mainElement;

  if(!foundType){
    mainElement = el('main', {}, el('p', {}, 'not found'));
  }else{
    const contentJsonFile = getDataURL(foundType, 'index.json');
    const contentJson = await fetcher(contentJsonFile);

    const content = contentJson.content;
    const contentElement = document.createElement('div');

    for(const item of content){
      const itemElement = document.createElement('section');

      const button = document.createElement('button');
      button.textContent = item.title;
      itemElement.appendChild(button);

      button.addEventListener('click', (e) => {
        if(!e){
          return;
        }

        const contentDiv = e?.target?.parentElement?.querySelector('div');
        contentDiv.classList.toggle('hidden');
      });

      const href = `/?type=${foundType}&content=${item.slug}`;
      const itemText = document.createElement('div');
      itemText.textContent = item.text;
      itemText.appendChild( el('a', { href, class: 'navigation__link' },'sjá meira'));
      itemText.classList.add('hidden');


      itemElement.appendChild(button);
      itemElement.appendChild(itemText);
      

      contentElement.appendChild(itemElement);
    }
    mainElement = contentElement;
  }

  root.appendChild(headerElement);
  root.appendChild(mainElement);
}
