import { renderNavigation } from '../components/navigation';
import { el } from '../element.js';
import { dynamicSwitch, sp } from '../switch.js';

export function renderIndexPage(root, indexJson) {
  console.log('rendering', root, indexJson.title);

  const headerElement = el(
    'header',
    {},
    el(
      'h1',
      {},
      indexJson.title
    ),
    renderNavigation(indexJson.navigation,()=>{dynamicSwitch(root, indexJson)}),
  );

  const mainElement = el(
    'main',
    {},
    el(
      'section',
      {},
    ),
  );
  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
