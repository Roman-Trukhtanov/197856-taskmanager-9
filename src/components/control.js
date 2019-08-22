import {createElement} from "../utils";

export default class Control {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="control__btn-wrap">
    ${this._data
      .map(({id, name, isChecked}) => {
        const newTaskClass = id === `new-task` ? `control__label--new-task` : ``;

        return `<input
          type="radio"
          name="control"
          id="control__${id}"
          class="control__input visually-hidden"
          ${isChecked ? ` checked` : ``}
        />
        <label for="control__${id}" class="control__label ${newTaskClass}">${name.toUpperCase()}</label>`.trim();
      }).join(``)}
    </section>`.trim();
  }
}
