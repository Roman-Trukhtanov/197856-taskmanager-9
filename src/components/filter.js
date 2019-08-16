// Получаем разметку одного фильтра
const getFilterItem = ({title, count}) => {
  title = title.toLowerCase();

  const checked = title === `all` ? `checked` : ``;

  const disabled = count === 0 ? `disabled` : ``;

  return `<input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked}
    ${disabled}
  />
  <label for="filter__${title}" class="filter__label">${title} <span class="filter__${title}-count">${count}</span>
  </label>`.trim();
};

// Получаем разметку блока с "Фильтрами"
export const getFilterLayout = (filtersData) => {
  return `<section class="main__filter filter container">
    ${filtersData.map((filter) => getFilterItem(filter)).join(``)}
</section>`.trim();
};
