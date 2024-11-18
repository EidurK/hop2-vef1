import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { fetcher } from '../lib/fetcher.js';
import { renderIndexPage } from '../lib/pages/index-page.js';

async function render(root, querystring){ 
  const mainIndexJson = await fetcher('data/index.json');

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');

  console.log(type, content);

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  if (content) {
    return renderContentPage(root, mainIndexJson);
  }

  renderSubpage(root, mainIndexJson, type);
}

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = document.querySelector('#app');
render(root, window.location.search);
