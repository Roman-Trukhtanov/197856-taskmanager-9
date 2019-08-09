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
export const getFilterLayout = (data) => {
  let filtersLayout = ``;

  for (const item of data) {
    const filterItem = getFilterItem(item.id, item.name, item.count);

    filtersLayout += filterItem;
  }

  return `<section class="main__filter filter container">
    ${filtersLayout}
</section>`;
};
