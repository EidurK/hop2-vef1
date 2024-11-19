import { el } from '../element.js';

export function renderNavigation(navigation, onClickHandler) {
  /*
  <nav>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
  </nav>
  */
  const navigationElement = el('ul', { class: 'navigation__list' });

  const homeButton = el('button' ,{class: 'navigation_button', page: '/'}, 'home'); 
  homeButton.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    onClickHandler();
  });
  navigationElement.appendChild(el('li', { class: 'navigation__item' }, homeButton));

  for (const item of navigation) {
    const { title, slug } = item;
    /* sama og
    const title = item.title;
    const slug = item.slug;
    */
    const navButton = el('button' ,{class: 'navigation_button'}, title); 
    const href = `/?type=${slug}`;


    navButton.addEventListener('click',() => {
      window.history.pushState({ type: slug }, '', href);
      onClickHandler();
    });

    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      navButton
    );
    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
}
