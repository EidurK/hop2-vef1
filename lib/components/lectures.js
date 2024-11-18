import { el } from '../element.js';

export async function renderLectures(contentJson){
  const mainElement = document.createElement('div');

  const lectures = contentJson.lectures;
  for(const lecture of lectures){
    const lectureElement = el('div', {}, el('h2', {}, lecture.title));
    const content = lecture.content;
    for(const item of content){
      switch(item.type){
        case "heading":
          lectureElement.appendChild(el('h3', {}, item.data));
          break;
        case "text":
          lectureElement.appendChild(el('p', {}, item.data));
          break;
        case "quote":
          lectureElement.appendChild(el('p', {class: "quote"}, item.data, el('p',{class: "attribute"}, item.attribute)));
          break;
        case "image":
          lectureElement.appendChild(el('figure', {class: "image"}, el('img', {src: item.data}), el('figcaption', {class: 'caption'}, item.caption)));
          break;
        case "list":
          lectureElement.appendChild(el('ul', {}, ...item.data.map((d) => el('li', {}, d))));
          break;
        default:
          lectureElement.appendChild(el('p',{}, `${item.type} is not valid type bozo!!`));
          break;
      }
    }
    mainElement.appendChild(lectureElement);
  }

  return mainElement;

}
