import { renderIndexPage } from "./pages/index-page";
import { renderSubpage } from "./pages/sub-page";
import { renderContentPage } from "./pages/content-page";

export async function sp(){
  const { type, content } = window.history.state;
  content? window.location.assign(`/?type=${type}&content=${content}`):type?window.location.assign(`/?type=${type}`):window.location.assign('/') ;
      
}

export function dynamicSwitch(root, mainIndexJson){
  const querystring = window.location.search;

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');

  root.innerHTML = '';

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  if (content) {
    return renderContentPage(root, mainIndexJson, params);
  }

  return renderSubpage(root, mainIndexJson, params);

}
