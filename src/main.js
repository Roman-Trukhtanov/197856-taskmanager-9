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

  data.forEach((item) => {
    controlLayout += getControlItem(item.id, item.name, item.isChecked);
  });

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

  data.forEach((item) => {
    const filterItem = getFilterItem(item.id, item.name, item.count);

    filtersLayout += filterItem;
  });

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

// Получаем разметку блока "Board"
const getBoardLayout = () => {
  const loadMoreBtn = getLoadMoreBtn();

  return `<section class="board container">
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
