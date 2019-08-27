import AbstractComponent from "./abstract-component";

export default class Control extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
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
