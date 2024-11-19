import '/style.css'

import { dynamicSwitch } from '../lib/switch.js';
import { fetcher } from '../lib/fetcher.js';


async function render(root){ 
  const mainIndexJson = await fetcher('data/index.json');

  window.addEventListener('popstate', ()=>{
    dynamicSwitch(root, mainIndexJson);
  });

  return dynamicSwitch(root, mainIndexJson);
}

const root = document.querySelector('#app');
render(root);
