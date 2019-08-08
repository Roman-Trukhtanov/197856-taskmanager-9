"use strict";

// Отрисовывет компонент
const renderComponent = (container, layoutTemplate) => {
  container.insertAdjacentHTML(`beforeend`, layoutTemplate);
};

// Основной контейнер
const mainContainer = document.querySelector(`.main`);

// Контейнер блока с Меню
const controlContainer = document.querySelector(`.control`);

/* ---------- Controls ---------- */
// Данные кнопок управления
const dataControls = [
  {
    id: `new-task`,
    name: `+ Add New Task`,
    isChecked: false,
  },
  {
    id: `task`,
    name: `Tasks`,
    isChecked: true,
  },
  {
    id: `statistic`,
    name: `Statistics`,
    isChecked: false,
  },
];

// Получаем разметку одной унопки управления
const getControlItem = (id, name, isChecked = false) => {
  const newTaskClass = id === `new-task` ? `control__label--new-task` : ``;

  return `<input
      type="radio"
      name="control"
      id="control__${id}"
      class="control__input visually-hidden"
      ${isChecked ? ` checked` : ``}
    />
    <label for="control__${id}" class="control__label ${newTaskClass}">${name.toUpperCase()}</label>`;
};

// Получаем разметку блока с "Меню"
const getControlLayout = (data) => {
  let controlLayout = ``;

  for (const item of data) {
    controlLayout += getControlItem(item.id, item.name, item.isChecked);
  }

  return `<section class="control__btn-wrap"> 
    ${controlLayout}
  </section>`;
};
/* ---------- Controls (End) ---------- */

/* ---------- Search ---------- */
// Получаем разметку блока с "Поиском"
const getSearchLayout = () => {
  return `<section class="main__search search container">
  <input
    type="text"
    id="search__input"
    class="search__input"
    placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
  />
  <label class="visually-hidden" for="search__input">Search</label>
</section>`;
};
/* ---------- Search (End) ---------- */

/* ---------- Filters ---------- */
// Данные фильтров
const dataFilters = [
  {
    id: `all`,
    name: `All`,
    count: 10
  },
  {
    id: `overdue`,
    name: `Overdue`,
    count: 0
  },
  {
    id: `today`,
    name: `Today`,
    count: 0
  },
  {
    id: `favorites`,
    name: `Favorites`,
    count: 5
  },
  {
    id: `repeating`,
    name: `Repeating`,
    count: 2
  },
  {
    id: `tags`,
    name: `Tags`,
    count: 3
  },
  {
    id: `archive`,
    name: `Archive`,
    count: 95
  },
];

// Получаем разметку одного фильтра
const getFilterItem = (id, name, count = 0) => {
  id = id.toLowerCase();

  if (count < 0) {
    count = 0;
  }

  const checked = id === `all` ? `checked` : ``;

  const disabled = count === 0 ? `disabled` : ``;

  return `<input
    type="radio"
    id="filter__${id}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked}
    ${disabled}
  />
  <label for="filter__${id}" class="filter__label">
    ${name} <span class="filter__${id}-count">${count}</span>
  </label>`;
};

// Получаем разметку блока с "Фильтрами"
const getFilterLayout = (data) => {
  let filtersLayout = ``;

  for (const item of data) {
    const filterItem = getFilterItem(item.id, item.name, item.count);

    filtersLayout += filterItem;
  }

  return `<section class="main__filter filter container">
    ${filtersLayout}
</section>`;
};
/* ---------- Filters (End) ---------- */

/* ---------- Board ---------- */
// Получаем разметку кнопки "Загрузит еще"
const getLoadMoreBtn = () => {
  return ` <button class="load-more" type="button">load more</button>`;
};

const getBoardFilterList = () => {
  return `<div class="board__filter-list">
    <a href="#" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" class="board__filter">SORT BY DATE up</a>
    <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`;
};

const CARD_COLORS = {
  black: `card--black`,
  pink: `card--pink`,
  yellow: `card--yellow`,
  blue: `card--blue`,
  green: `card--green`,
};

const cardTasks = [
  {
    color: `black`,
    text: `Example default task with default color.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: false,
    isDeadline: false,
  },
  {
    color: `pink`,
    text: `It is example of repeating task. It marks by wave.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: true,
    isDeadline: false,
  },
  {
    color: `black`,
    text: `This is card with missing deadline. Deadline always marked by red line.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: false,
    isDeadline: true,
  },
];

const getCardEditForm = () => {
  return `<article class="card card--edit card--yellow card--repeat">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
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
            >Here is a card with filled data</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">yes</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="23 September 11:15 PM"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-4"
                    name="repeat"
                    value="mo"
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
                    checked
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
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-fr-4"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-4"
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
                    checked
                  />
                  <label class="card__repeat-day" for="repeat-su-4"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">
                    #repeat
                  </p>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">
                    #cinema
                  </p>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>

                <span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="repeat"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">
                    #entertaiment
                  </p>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>
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
                checked
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
  </article>`;
};

const getCardItem = (color, text, hashTags, date, time, isRepeat = false, isDeadline = false) => {
  let hashTagItemsLayout = ``;

  for (const item of hashTags) {
    const hashTag = `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${item}
      </span>
    </span>`;

    hashTagItemsLayout += hashTag;
  }


  return `<article class="card ${CARD_COLORS[color]}${isRepeat ? ` card--repeat` : ``}${isDeadline ? ` card--deadline` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
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
          <p class="card__text">${text}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${hashTagItemsLayout}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};

const getBoardTasks = (data) => {
  let boardTasks = ``;

  for (const item of data) {
    const cardTask = getCardItem(item.color, item.text, item.hashTags, item.date, item.time, item.isRepeat, item.isDeadline);

    boardTasks += cardTask;
  }

  const cardEditForm = getCardEditForm();

  return `<div class="board__tasks">
    ${cardEditForm}
    ${boardTasks}
  </div>`;
};

// Получаем разметку блока "Board"
const getBoardLayout = () => {
  const loadMoreBtn = getLoadMoreBtn();

  const boardFilterList = getBoardFilterList();

  const boardTasks = getBoardTasks(cardTasks);

  return `<section class="board container">
     ${boardFilterList}
     ${boardTasks}
     ${loadMoreBtn}
  </section>`;
};
/* ---------- Board (End) ---------- */

// Инициализируем приложения
const initTodoApp = () => {
  renderComponent(controlContainer, getControlLayout(dataControls));
  renderComponent(mainContainer, getSearchLayout());
  renderComponent(mainContainer, getFilterLayout(dataFilters));
  renderComponent(mainContainer, getBoardLayout());
};

initTodoApp();
