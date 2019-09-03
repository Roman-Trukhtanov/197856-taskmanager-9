import {isEscKey, Position, render} from '../utils';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class TaskController {
  constructor(container, taskData, onChangeView, onDataChange) {
    this._container = container;
    this._taskData = taskData;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.initFlatPickr = this.initFlatPickr.bind(this);
    this.removeFlatPickr = this.removeFlatPickr.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this._task = new Task(taskData);
    this._taskEdit = new TaskEdit(taskData, this.initFlatPickr, this.removeFlatPickr, this.checkDate);
    this._flatPickr = null;
    this.init();
    this._isHasData = false;
  }

  init() {
    this._renderTasks();
  }

  checkDate() {
    return this._isHasData;
  }

  initFlatPickr(element) {
    this._flatPickr = flatpickr(element, {
      altInput: true,
      altFormat: `j M, h:i K`,
      allowInput: true,
      enableTime: true,
      defaultDate: this._taskData.dueDate ? this._taskData.dueDate : Date.now()
    });
    this._isHasData = this._taskData.dueDate !== null;
  }

  removeFlatPickr() {
    if (this._flatPickr !== null) {
      this._flatPickr.destroy();
      this._isHasData = false;
    }
  }

  _renderTasks() {
    const taskElement = this._task.getElement();

    const taskEditElement = this._taskEdit.getElement();

    const onEscKeyDown = (evt) => {
      if (isEscKey(evt)) {
        if (this._container.contains(taskEditElement)) {
          this._container.replaceChild(taskElement, taskEditElement);
          this._onDataChange();
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskElement
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this.initFlatPickr(taskEditElement.querySelector(`.card__date`));
        this._container.replaceChild(taskEditElement, taskElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditElement
      .querySelector(`.card__btn--archive`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const archiveBtn = evt.currentTarget;

        archiveBtn.classList.toggle(`card__btn--disabled`);

        this._taskData.isArchive = !this._taskData.isArchive;
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
      .querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const favoriteBtn = evt.currentTarget;

        favoriteBtn.classList.toggle(`card__btn--disabled`);

        this._taskData.isFavorite = !this._taskData.isFavorite;
      });

    taskEditElement
      .querySelector(`.card__save`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onDataChange(this._getNewData(), this._taskData);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    const onCardFormSubmit = (evt) => {
      evt.preventDefault();
      this._onDataChange(this._getNewData(), this._taskData);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    taskEditElement
      .querySelector(`.card__form`)
      .addEventListener(`submit`, onCardFormSubmit);

    render(this._container, taskElement, Position.BEFOREEND);
  }

  _getNewData() {
    const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));

    return Object.assign(this._taskData, {
      description: formData.get(`text`),
      dueDate: formData.get(`date`) !== null ? new Date(formData.get(`date`)).getTime() : null,
      repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
        acc[it] = true;
        return acc;
      }, {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }),
      tags: new Set(formData.getAll(`hashtag`)),
      color: formData.get(`color`),
    });
  }

  setDefaultView() {
    if (this._container.contains(this._taskEdit.getElement())) {
      this.removeFlatPickr();
      this._container.replaceChild(this._task.getElement(), this._taskEdit.getElement());
    }
  }
}
