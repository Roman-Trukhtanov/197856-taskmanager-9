import AbstractComponent from "./abstract-component";

export default class FilterItem extends AbstractComponent {
  constructor({title, count}) {
    super();
    this._title = title;
    this._count = count;
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
