// Получаем разметку одной кнопки управления
const getControlItem = (id, name, isChecked = false) => {
  const newTaskClass = id === `new-task` ? `control__label--new-task` : ``;

  return `<input
      type="radio"
      name="control"
      id="control__${id}"
      class="control__input visually-hidden"
      ${isChecked ? ` checked` : ``}
    />
    <label for="control__${id}" class="control__label ${newTaskClass}">${name.toUpperCase()}</label>`.trim();
};

// Получаем разметку блока с "Меню"
export const getControlLayout = (data) => {
  let controlLayout = ``;

  for (const item of data) {
    controlLayout += getControlItem(item.id, item.name, item.isChecked);
  }

  return `<section class="control__btn-wrap"> 
    ${controlLayout}
  </section>`.trim();
};
