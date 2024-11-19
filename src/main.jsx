import './index.css'

import { dynamicSwitch } from '../lib/switch.js';
import { fetcher } from '../lib/fetcher.js';
import { renderIndexPage } from '../lib/pages/index-page.js';
import { renderSubpage } from '../lib/pages/sub-page.js';
import { renderContentPage } from '../lib/pages/content-page';


async function render(root, querystring){ 
  const mainIndexJson = await fetcher('data/index.json');

  window.addEventListener('popstate', ()=>{
    dynamicSwitch(root, mainIndexJson);
  });

  return dynamicSwitch(root, mainIndexJson);
}

const root = document.querySelector('#app');
render(root, window.location.search);
