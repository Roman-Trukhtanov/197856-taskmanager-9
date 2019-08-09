import {getLoadMoreBtn} from "./load-more";
import {getTaskEditForm} from "./task-edit";
import {getSortingList} from "./sorting";
import {getTaskItem} from "./task";
import {cardTasks} from "../data";

const getBoardTasks = (data) => {
  let boardTasks = ``;

  for (const item of data) {
    const cardTask = getTaskItem(item.color, item.text, item.hashTags, item.date, item.time, item.isRepeat, item.isDeadline);

    boardTasks += cardTask;
  }

  const cardEditForm = getTaskEditForm();

  return `<div class="board__tasks">
    ${cardEditForm}
    ${boardTasks}
  </div>`;
};

export const getBoardLayout = () => {
  const loadMoreBtn = getLoadMoreBtn();

  const boardFilterList = getSortingList();

  const boardTasks = getBoardTasks(cardTasks);

  return `<section class="board container">
     ${boardFilterList}
     ${boardTasks}
     ${loadMoreBtn}
  </section>`;
};
