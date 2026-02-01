import { createElement } from '/e32/functions/dom.js';
export class Field {
  id = null;
  value     = null;
  fieldType = null;

  elements = {
    wrapper:  null,
    label:    null,
    control:  null,
    valueBox: null,
  }

  constructor(params) {
    this
      .initData(params)
      .initElement(params)
      .trigger('change');
  }
  initData(params) {
    const { value, fieldType, id } = params;
    this.id        = id;
    this.fieldType = fieldType;
    this.value     = value;
    return this;
  }
  
  handlerPipe(event) {
    this.value = event.target.value;
    this.updateValueBox();
    return handler => handler && handler(event, this.value, this);
  }

  initElement(params ) {
    const { title, value, attributes, fieldType, handlers = null } = params;
    const { id }  = this;
    const wrapper = createElement('div',   {attributes: {class: 'field'}});
    const label   = createElement('label', {attributes: {class: 'label', for: id}, text: title});
    const valueBox = createElement('pre',  {attributes: {class: 'value-box'},      text: value});
    let control = null;

    if(fieldType === 'slider') {
      control = createElement('input', {attributes:{...attributes, class: 'control', type: 'range'}, value});
    }

    if(fieldType === 'select') {
      const { options } = params;
      control = createElement('select', {attributes:{...attributes, class: 'control control:select'}, value});
      options.forEach(option => {
        const optionElement = createElement('option', {attributes: {value: option.value}, text: option.text});
        control.append(optionElement);
      });
    }

    if(fieldType === 'file') {
      control = createElement('input', {attributes:{...attributes, class: 'control', type: 'file'}, value});
    }

    control.addEventListener('change', ev => this.handlerPipe(ev)(handlers.onChange));
    control.addEventListener('input',  ev => this.handlerPipe(ev)(handlers.onInput));

    wrapper.append(label, control, valueBox);

    this.elements.label   = label;
    this.elements.control = control;
    this.elements.wrapper = wrapper;
    this.elements.valueBox = valueBox;
    return this;
  }

  updateValueBox(fn) {
    if(fn) fn(this.elements.valueBox);
    else this.elements.valueBox.textContent = this.value;
    return this;
  }

  trigger(eventName) {
    this.elements.control.value = this.value;
    this.elements.control.dispatchEvent(new Event(eventName, { bubbles: true }));
    return this;
  }

  get element () {
    return this.elements.wrapper;
  }
}

export default Field;
