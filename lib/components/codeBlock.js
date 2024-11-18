import { el } from '../element.js';

import hljs from '@highlightjs/cdn-assets/es/core.js';
import javascript from '@highlightjs/cdn-assets/es/languages/javascript.min.js';
import css from '@highlightjs/cdn-assets/es/languages/css.min.js';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

export async function codeBlock(data, language){

  const codeElement =  el(
    'pre',
    {}, 
    el( 
      'code',
      {class: `language-${language}`},
      data
    )
  )

  hljs.highlightElement(codeElement);
  return codeElement;
}
