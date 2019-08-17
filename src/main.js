import {renderComponent} from "./utils";
import {getControlLayout} from "./components/control";
import {getSearchLayout} from "./components/search";
import {getFilterLayout} from "./components/filter";
import {getBoardLayout} from "./components/board";
import {addListenerToLoadBtn} from "./components/board";
import {dataControls, filtersData} from "./data";

const mainContainer = document.querySelector(`.main`);

const controlContainer = document.querySelector(`.control`);

const initTodoApp = () => {
  renderComponent(controlContainer, getControlLayout(dataControls));
  renderComponent(mainContainer, getSearchLayout());
  renderComponent(mainContainer, getFilterLayout(filtersData));
  renderComponent(mainContainer, getBoardLayout());
  addListenerToLoadBtn();
};

initTodoApp();

