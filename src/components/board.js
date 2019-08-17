import {renderComponent} from "../utils";
import {getLoadMoreBtn} from "./load-more";
import {getTaskEditForm} from "./task-edit";
import {getSortingList} from "./sorting";
import {getTaskItem} from "./task";
import {allTasksData} from "../data";
import {MAX_VISIBLE_TASKS_COUNT} from "../config";

const copyTasksData = [...allTasksData];

const getBoardTasks = (tasks) => {
  const cardEditForm = getTaskEditForm(tasks.splice(0, 1)[0]);

  let tasksLayout = ``;

  if (tasks.length >= MAX_VISIBLE_TASKS_COUNT) {
    tasksLayout += tasks.splice(0, MAX_VISIBLE_TASKS_COUNT - 1).map((task) => getTaskItem(task)).join(``);
  } else {
    tasksLayout += tasks.map((task) => getTaskItem(task)).join(``);
  }

  return `<div class="board__tasks">
    ${cardEditForm}
    ${tasksLayout}
  </div>`.trim();
};

export const getBoardLayout = () => {
  const loadMoreBtn = getLoadMoreBtn();

  const boardSortingList = getSortingList();

  const boardTasks = getBoardTasks(copyTasksData);

  return `<section class="board container">
     ${boardSortingList}
     ${boardTasks}
     ${allTasksData.length > MAX_VISIBLE_TASKS_COUNT ? loadMoreBtn : ``}
  </section>`.trim();
};

export const addListenerToLoadBtn = () => {
  const loadMoreBtn = document.querySelector(`.load-more`);

  if (loadMoreBtn) {
    const loadTasks = () => {
      const boardTasksItem = document.querySelector(`.board__tasks`);

      let tasksItemsLayout = null;
      let isTheLastTasks = false;

      if (copyTasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
        tasksItemsLayout = copyTasksData.splice(0, MAX_VISIBLE_TASKS_COUNT - 1).map((task) => getTaskItem(task)).join(``);
      } else {
        tasksItemsLayout = copyTasksData.map((task) => getTaskItem(task)).join(``);
        isTheLastTasks = true;
      }

      renderComponent(boardTasksItem, tasksItemsLayout, `beforeend`);

      if (isTheLastTasks) {
        loadMoreBtn.remove();
      }
    };

    const onLoadMoreBtnClick = (evt) => {
      evt.preventDefault();
      loadTasks();
    };

    loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
  }
};
