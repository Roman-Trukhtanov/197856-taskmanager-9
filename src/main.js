import {render, Position, isEscKey} from "./utils";
import Search from "./components/search";
import Control from "./components/control";
import Filter from "./components/filter";
import FilterItem from "./components/filter-item";
import Board from "./components/board";
import Sorting from "./components/sorting";
import BoardTasks from "./components/board-tasks";
import LoadMore from "./components/load-more";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import BoardNoTasks from "./components/board-no-tasks";
import {allTasksData, dataControls, filtersData} from "./data";
import {MAX_VISIBLE_TASKS_COUNT} from "./config";

const mainContainer = document.querySelector(`.main`);

const controlContainer = document.querySelector(`.control`);

const copyTasksData = [...allTasksData];

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

const renderTasks = (taskData, container) => {
  const task = new Task(taskData);
  const taskElement = task.getElement();

  const taskEdit = new TaskEdit(taskData);
  const taskEditElement = taskEdit.getElement();

  const onEscKeyDown = (evt) => {
    if (isEscKey(evt)) {
      container.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskElement
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(taskEditElement, taskElement);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEditElement
    .querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEditElement.querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEditElement
    .querySelector(`.card__save`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      container.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEditElement
    .querySelector(`.card__form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      container.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(container, taskElement, Position.BEFOREEND);
};

const getBoardTasks = (tasksData) => {
  const boardTasks = new BoardTasks();
  const boardTasksElement = boardTasks.getElement();

  for (const taskData of tasksData) {
    if (tasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
      tasksData.splice(0, MAX_VISIBLE_TASKS_COUNT).forEach((task) => {
        renderTasks(task, boardTasksElement);
      });

      break;
    } else {
      renderTasks(taskData, boardTasksElement);
    }
  }

  return boardTasksElement;
};

const addListenerToLoadBtn = (btn, container) => {
  if (btn) {
    const loadTasks = () => {
      let isTheLastTasks = false;

      if (copyTasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
        copyTasksData.splice(0, MAX_VISIBLE_TASKS_COUNT).forEach((task) => {
          renderTasks(task, container);
        });
      } else {
        copyTasksData.forEach((task) => renderTasks(task, container));
        isTheLastTasks = true;
      }

      if (isTheLastTasks) {
        btn.remove();
      }
    };

    const onLoadMoreBtnClick = (evt) => {
      evt.preventDefault();
      loadTasks();
    };

    btn.addEventListener(`click`, onLoadMoreBtnClick);
  }
};

const renderBoard = (tasksData, filters) => {
  const board = new Board();
  const boardElement = board.getElement();

  const noTasks = new BoardNoTasks();
  const noTasksElement = noTasks.getElement();

  const loadMoreBtn = new LoadMore();
  const loadMoreBtnElement = loadMoreBtn.getElement();

  const boardSorting = new Sorting();
  const boardSortingElement = boardSorting.getElement();

  const boardTasksElement = getBoardTasks(tasksData);

  if (filters.all.count === 0 || (filters.archive.count > 0 && filters.all.count === 0)) {
    render(boardElement, noTasksElement, Position.BEFOREEND);
  } else {
    addListenerToLoadBtn(loadMoreBtnElement, boardTasksElement);

    render(boardElement, boardSortingElement, Position.BEFOREEND);
    render(boardElement, boardTasksElement, Position.BEFOREEND);

    if (allTasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
      render(boardElement, loadMoreBtnElement, Position.BEFOREEND);
    }
  }

  render(mainContainer, boardElement, Position.BEFOREEND);
};

const initTodoApp = () => {
  renderControl(dataControls);
  renderSearch();
  renderFilters(filtersData);
  renderBoard(copyTasksData, filtersData);
};

initTodoApp();

