import {isEscKey, Position, render} from "../utils";
import Board from "../components/board";
import BoardNoTasks from "../components/board-no-tasks";
import LoadMore from "../components/load-more";
import Sorting from "../components/sorting";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import BoardTasks from "../components/board-tasks";
import {MAX_VISIBLE_TASKS_COUNT} from "../config";

export default class BoardController {
  constructor(container, tasksData, filtersData, monthsNames) {
    this._container = container;
    this._tasksData = tasksData;
    this._copyTasksData = [...tasksData];
    this._filtersData = filtersData;
    this._monthsNames = monthsNames;
    this._board = new Board();
    this._boardTasks = new BoardTasks();
    this._noTasks = new BoardNoTasks();
    this._loadMoreBtn = new LoadMore();
    this._boardSorting = new Sorting();
  }

  init() {
    this._renderBoard();
  }

  _addListenerToLoadBtn(btn, container) {
    if (btn) {
      const loadTasks = () => {
        let isTheLastTasks = false;

        if (this._copyTasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
          this._copyTasksData.splice(0, MAX_VISIBLE_TASKS_COUNT).forEach((task) => {
            this._renderTasks(task, container);
          });
        } else {
          this._copyTasksData.forEach((task) => this._renderTasks(task, container));
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
  }

  _renderTasks(taskData, container) {
    const task = new Task(taskData, this._monthsNames);
    const taskElement = task.getElement();

    const taskEdit = new TaskEdit(taskData, this._monthsNames);
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
  }

  _getBoardTasks() {
    const boardTasksElement = this._boardTasks.getElement();

    for (const taskData of this._copyTasksData) {
      if (this._copyTasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
        this._copyTasksData.splice(0, MAX_VISIBLE_TASKS_COUNT).forEach((task) => {
          this._renderTasks(task, boardTasksElement);
        });

        break;
      } else {
        this._renderTasks(taskData, boardTasksElement);
      }
    }

    return boardTasksElement;
  }

  _renderBoard() {
    const boardElement = this._board.getElement();

    const noTasksElement = this._noTasks.getElement();

    const loadMoreBtnElement = this._loadMoreBtn.getElement();

    const boardSortingElement = this._boardSorting.getElement();

    const boardTasksElement = this._getBoardTasks();

    if (this._filtersData.all.count === 0 || (this._filtersData.archive.count > 0 && this._filtersData.all.count === 0)) {
      render(boardElement, noTasksElement, Position.BEFOREEND);
    } else {
      this._addListenerToLoadBtn(loadMoreBtnElement, boardTasksElement);

      render(boardElement, boardSortingElement, Position.BEFOREEND);
      render(boardElement, boardTasksElement, Position.BEFOREEND);

      if (this._tasksData.length >= MAX_VISIBLE_TASKS_COUNT) {
        render(boardElement, loadMoreBtnElement, Position.BEFOREEND);
      }
    }

    render(this._container, boardElement, Position.BEFOREEND);
  }
}
