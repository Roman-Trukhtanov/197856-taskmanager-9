import {renderComponent} from "./utils";
import {getControlLayout} from "./components/control";
import {getSearchLayout} from "./components/search";
import {getFilterLayout} from "./components/filter";
import {getBoardLayout} from "./components/board";
import {dataControls, dataFilters} from "./data";

const mainContainer = document.querySelector(`.main`);

const controlContainer = document.querySelector(`.control`);

const initTodoApp = () => {
  renderComponent(controlContainer, getControlLayout(dataControls), `beforeend`);
  renderComponent(mainContainer, getSearchLayout(), `beforeend`);
  renderComponent(mainContainer, getFilterLayout(dataFilters), `beforeend`);
  renderComponent(mainContainer, getBoardLayout(), `beforeend`);
};

initTodoApp();
