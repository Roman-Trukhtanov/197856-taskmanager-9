import {createElement, Position, render, unrender} from "../utils";
import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class TaskEdit extends AbstractComponent {
  constructor({description, repeatingDays, tags, color, dueDate, isFavorite, isArchive}, initFlatPickr, removeFlatPickr, checkDate) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._copiedTags = new Set([...tags]);
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._initFlatPickr = initFlatPickr;
    this._removeFlatPickr = removeFlatPickr;
    this._checkDate = checkDate;

    this._addListenerToDateItem();
    this._addListenerToRepeatItem();
    this._addListenerToColors();
    this._addListenerToHashTag();
    this._addRemoveTagsListeners();
  }

  _getTag(tag) {
    return `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="${tag}"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`.trim();
  }

  getTemplate() {
    const isRepeated = Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]);

    const isDeadLine = moment(this._dueDate).format(`YYYY-MM-DD-HH-mm`) < moment(Date.now()).format(`YYYY-MM-DD-HH-mm`);

    return `<article class="card card--edit card--${this._color} ${isRepeated ? `card--repeat` : ``} ${isDeadLine ? `card--deadline` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>
  
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
  
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._description}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate !== null ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__date-deadline" ${this._dueDate !== null ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${moment(this._dueDate).format(`DD:MM:YYYY`)}"
                    />
                  </label>
                </fieldset>
  
                <button class="card__repeat-toggle" type="button">repeat:<span class="card__repeat-status">${isRepeated ? `yes` : `no`}</span></button>
  
                <fieldset class="card__repeat-days" ${isRepeated ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-4"
                      name="repeat"
                      value="mo"
                      ${this._repeatingDays[`mo`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-4"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-4"
                      name="repeat"
                      value="tu"
                      ${this._repeatingDays[`tu`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-4"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-4"
                      name="repeat"
                      value="we"
                      ${this._repeatingDays[`we`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-4"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-4"
                      name="repeat"
                      value="th"
                      ${this._repeatingDays[`th`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-4"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-4"
                      name="repeat"
                      value="fr"
                      ${this._repeatingDays[`fr`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-4"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-sa-4"
                      name="repeat"
                      value="sa"
                      ${this._repeatingDays[`sa`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-4"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-4"
                      name="repeat"
                      value="su"
                      ${this._repeatingDays[`su`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-4"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>
  
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => this._getTag(tag)).join(``)}
                </div>
  
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
  
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-4"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  ${this._color === `black` ? `checked` : ``}
                />
                <label
                  for="color-black-4"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-4"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  ${this._color === `yellow` ? `checked` : ``}
                />
                <label
                  for="color-yellow-4"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-4"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                  ${this._color === `blue` ? `checked` : ``}
                />
                <label
                  for="color-blue-4"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-4"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  ${this._color === `green` ? `checked` : ``}
                />
                <label
                  for="color-green-4"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-4"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  ${this._color === `pink` ? `checked` : ``}
                />
                <label
                  for="color-pink-4"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>
  
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  _addListenerToDateItem() {
    const taskEditElement = this.getElement();

    taskEditElement
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const targetItem = evt.currentTarget;

        const dateDeadlineItem = taskEditElement.querySelector(`.card__date-deadline`);

        const cardDateItem = dateDeadlineItem.querySelector(`.card__date`);

        const dateStatus = targetItem.querySelector(`.card__date-status`);

        if (this._checkDate()) {
          dateStatus.textContent = `no`;
          cardDateItem.value = ``;
          this._removeFlatPickr();
          dateDeadlineItem.disabled = true;
        } else {
          dateStatus.textContent = `yes`;
          this._initFlatPickr(cardDateItem);
          dateDeadlineItem.disabled = false;
        }
      });
  }

  _addListenerToRepeatItem() {
    const taskEditElement = this.getElement();

    taskEditElement
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const targetItem = evt.currentTarget;

        const repeatDaysItems = taskEditElement.querySelector(`.card__repeat-days`);

        const repeatDayInputs = repeatDaysItems.querySelectorAll(`.card__repeat-day-input`);

        const repeatStatus = targetItem.querySelector(`.card__repeat-status`);

        if (repeatDaysItems.disabled) {
          repeatDaysItems.disabled = false;
          repeatStatus.textContent = `yes`;
          taskEditElement.classList.add(`card--repeat`);

          for (const repeatDayInput of repeatDayInputs) {
            repeatDayInput.checked = this._repeatingDays[repeatDayInput.value];
          }
        } else {
          repeatStatus.textContent = `no`;
          taskEditElement.classList.remove(`card--repeat`);

          for (const repeatDayInput of repeatDayInputs) {
            repeatDayInput.checked = false;
          }

          repeatDaysItems.disabled = true;
        }
      });
  }

  _addListenerToColors() {
    const taskEditElement = this.getElement();

    const cardForm = taskEditElement.querySelector(`.card__form`);

    let color = this._color;

    cardForm.addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`card__color-input`)) {
        evt.preventDefault();
        const targetColor = evt.target.value;
        taskEditElement.classList.remove(`card--${color}`);
        taskEditElement.classList.add(`card--${targetColor}`);
        color = targetColor;
      }
    });
  }

  _addListenerToHashTag() {
    const taskEditElement = this.getElement();

    const hashTagListItem = taskEditElement.querySelector(`.card__hashtag-list`);

    const hashTagTextInput = taskEditElement.querySelector(`.card__hashtag-input`);

    hashTagTextInput.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();

        const tagElement = createElement(this._getTag(hashTagTextInput.value));

        if (hashTagTextInput.value !== `` && !this._copiedTags.has(hashTagTextInput.value)) {
          this._copiedTags.add(hashTagTextInput.value);
          render(hashTagListItem, tagElement, Position.BEFOREEND);
        }

        hashTagTextInput.value = ``;
      }
    });
  }

  _addRemoveTagsListeners() {
    const taskEditElement = this.getElement();

    const hashTagWrapItems = taskEditElement.querySelectorAll(`.card__hashtag-inner`);

    for (const tagWrapItem of hashTagWrapItems) {
      const deleteTagBtn = tagWrapItem.querySelector(`.card__hashtag-delete`);

      const tagInputItem = tagWrapItem.querySelector(`.card__hashtag-hidden-input`);

      deleteTagBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._copiedTags.delete(tagInputItem.value);
        unrender(tagWrapItem);
      });
    }
  }
}
