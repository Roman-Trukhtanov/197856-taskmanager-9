import {render, Position} from "./utils";
import Search from "./components/search";
import Control from "./components/control";
import Filter from "./components/filter";
import FilterItem from "./components/filter-item";
import {allTasksData, dataControls, filtersData} from "./data";
import BoardController from "./controllers/board";

const mainContainer = document.querySelector(`.main`);

const controlContainer = document.querySelector(`.control`);

const renderControl = (data) => {
  const control = new Control(data);
  const controlElement = control.getElement();

  render(controlContainer, controlElement, Position.BEFOREEND);
};

const renderSearch = () => {
  const search = new Search();
  const searchElement = search.getElement();

  render(mainContainer, searchElement, Position.BEFOREEND);
};

const renderFilters = (dataFilters) => {
  const filter = new Filter();
  const filterElement = filter.getElement();

  for (const filterData of Object.values(dataFilters)) {
    const filterItem = new FilterItem(filterData);
    const filterItemElement = filterItem.getElement();

    render(filterElement, filterItemElement, Position.BEFOREEND);
  }


  render(mainContainer, filterElement, Position.BEFOREEND);
};

const initTodoApp = () => {
  renderControl(dataControls);
  renderSearch();
  renderFilters(filtersData);

  const boardController = new BoardController(
      mainContainer,
      allTasksData,
      filtersData
  );

  boardController.init();
};

initTodoApp();

