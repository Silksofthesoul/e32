import { Field } from '/e32/classes/Field.js';
import { Form } from '/e32/classes/Form.js';

export class UI {
  target = null;
  form = null

  constructor({target}) {
    this.target = document.querySelector(target);
    if(!this.target) throw new Error(`Target ${target} not found`);
  }

  makeForm(title, params) {
    this.form = new Form({title, params, target: this.target});
    return this;
  }


  addSlider(title, params, handlers = null) {
    const field = new Field({...params, title, fieldType: 'slider', handlers});
    this.form.addFiled(field);
    return this;
  }

  addSelect(title, params, handlers = null) {
    const field = new Field({...params, title, fieldType: 'select', handlers});
    this.form.addFiled(field);
    return this;
  }

  addFile(title, params, handlers = null) {
    const field = new Field({...params, title, fieldType: 'file', handlers});
    this.form.addFiled(field);
    return this;
  }
  hideField(params) {
    const { id } = params;
    this.form.hideById(id);
    return this;
  }
  showField(params) {
    const { id } = params;
    this.form.showById(id);
    return this;
  }
}

export default UI;
