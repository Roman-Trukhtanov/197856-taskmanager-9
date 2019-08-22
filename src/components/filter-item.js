import {createElement} from "../utils";

export default class FilterItem {
  constructor({title, count}) {
    this._title = title;
    this._count = count;
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
    this._title = this._title.toLowerCase();

    const checked = this._title === `all` ? `checked` : ``;

    const disabled = this._count === 0 ? `disabled` : ``;

    return `<input
      type="radio"
      id="filter__${this._title}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked}
      ${disabled}
    />
    <label for="filter__${this._title}" class="filter__label">${this._title} <span class="filter__${this._title}-count">${this._count}</span>
    </label>`;
  }
}
