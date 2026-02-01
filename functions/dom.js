export const createElement = (tag, params) => {
  const {keys, entries} = Object;
  const { attributes, text } = params;
  const el = document.createElement(tag);
  if(attributes && keys(attributes).length) {
    for(const [key, value] of entries(attributes)) el.setAttribute(key, value);
  }
  if(text) el.textContent = text;
  return el;
}

export default {
  createElement,
}
