import { renderNavigation } from '../components/navigation.js';
import { el } from '../element.js';
import { fetcher } from '../fetcher.js';
import { dynamicSwitch, sp } from '../switch.js';


function getDataURL(foundType, fileName){
  return `data/${foundType}/${fileName}`;
}

function createItemElement(title, text, contentButton){
  const itemElement = document.createElement('section');

  const button = document.createElement('button');
  button.textContent = title;
  itemElement.appendChild(button);

  button.addEventListener('click', (e) => {
    if(!e){
      return;
    }

    const contentDiv = e?.target?.parentElement?.querySelector('div');
    contentDiv.classList.toggle('hidden');
  });

  const itemText = document.createElement('div');
  itemText.textContent = text;
  itemText.classList.add('hidden');

  itemText.appendChild(contentButton);
  itemElement.appendChild(button);
  itemElement.appendChild(itemText);
  return itemElement;
}


function createContentElement(root, indexJson, foundType, contentJson){
  const content = contentJson.content;
  const contentElement = document.createElement('div');

  for(const item of content){

    const href = `/?type=${foundType}&content=${item.slug}`;

    const contentButton = el('button',{}, 'Sjá meira');
    contentButton.addEventListener('click', ()=>{
      window.history.pushState({type: foundType, content: item.slug}, '', href);
      dynamicSwitch(root, indexJson);
    })

    const  itemElement = createItemElement(item.title, item.text, contentButton);

    contentElement.appendChild(itemElement);
  }
  return contentElement;
}

export async function renderSubpage(root, indexJson, params){

  const type = params.get('type');

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation, ()=>{ dynamicSwitch(root, indexJson)}));

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

    mainElement = createContentElement(root, indexJson, foundType, contentJson);
  }
  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
