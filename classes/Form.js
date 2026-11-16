import { createElement } from '../functions/dom.js';
export class Form {
  title = null;
  fields = [];
  elements = {
    form: null,
    title: null,
  }
  constructor(params) {
    this
      .initData(params)
      .initElement(params);
  }

  initData(params) {
    const { title } = params;
    this.title = title;
    return this;
  }

  initElement(params) {
    const { title: titleText, target } = params;
    if(!target) throw new Error('Target not found');
    const form  = createElement('form', {attributes: {class: 'form'}});
    const title = createElement('h1',   {attributes: {class: 'title'}, text: titleText});
    form.append(title);
    this.elements.form  = form;
    this.elements.title = title;
    target.append(this.element);
    return this;
  }

  addFiled(field) {
    this.fields.push(field);
    this.element.append(field.element);
    return this;
  }

  hideById(id) {
    const field = this.fields.find(field => field.id === id);
    if(field) field.element.classList.add('field:hidden');
    return this;
  }
  showById(id) {
    const field = this.fields.find(field => field.id === id);
    if(field) field.element.classList.remove('field:hidden');
    return this;
  }

  get element () { return this.elements.form; }
}

export default Form;
