import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { fetcher } from '../lib/fetcher.js';
import { renderIndexPage } from '../lib/pages/index-page.js';
import { renderSubpage } from '../lib//pages/sub-page.js';
import { renderContentPage } from '../lib/pages/content-page';

async function render(root, querystring){ 
  const mainIndexJson = await fetcher('data/index.json');

  const params = new URLSearchParams(querystring);
  console.log(`params -> ${params}`)
  const type = params.get('type');
  const content = params.get('content');
  console.log(`content -> ${content}`)

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  if (content) {
    return renderContentPage(root, mainIndexJson, params);
  }

  renderSubpage(root, mainIndexJson, params);
}

const root = document.querySelector('#app');
render(root, window.location.search);
