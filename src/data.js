import {TASK_COUNT} from "./config";

export const dataControls = [
  {
    id: `new-task`,
    name: `+ Add New Task`,
    isChecked: false,
  },
  {
    id: `task`,
    name: `Tasks`,
    isChecked: true,
  },
  {
    id: `statistic`,
    name: `Statistics`,
    isChecked: false,
  },
];

export const getCardTaskData = () => {
  return {
    description: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + (Math.floor(Math.random() * 15) - 7) * 24 * 60 * 60 * 1000,
    repeatingDays: {
      Mo: false,
      Tu: false,
      We: false,
      Th: Boolean(Math.floor(Math.random() * 2)),
      Fr: false,
      Sa: false,
      Su: false,
    },
    tags: new Set(new Array(Math.floor(Math.random() * 4))
      .fill(``)
      .map(() => [
        `homework`,
        `theory`,
        `practice`,
        `intensive`,
        `keks`,
        `answers`,
        `firework`,
        `work`
      ][Math.floor(Math.random() * 8)])),
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`
    ][Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.floor(Math.random() * 2)),
    isArchive: Boolean(Math.floor(Math.random() * 2)),
  };
};

export const allTasksData = new Array(TASK_COUNT).fill(``).map(() => getCardTaskData());

export const getFiltersData = (tasksData) => {
  return [
    {
      title: `all`,
      get count() {
        return tasksData.length;
      }
    },
    {
      title: `overdue`,
      get count() {
        return tasksData.filter((task) => new Date(task.dueDate).getDate() < new Date(Date.now()).getDate()).length;
      }
    },
    {
      title: `today`,
      get count() {
        return tasksData.filter((task) => new Date(task.dueDate).getDate() === new Date(Date.now()).getDate()).length;
      }
    },
    {
      title: `favorites`,
      get count() {
        return tasksData.filter((task) => task.isFavorite).length;
      }
    },
    {
      title: `repeating`,
      get count() {
        return tasksData.filter((task) => Object.values(task.repeatingDays).some((dayValue) => dayValue)).length;
      }
    },
    {
      title: `tags`,
      get count() {
        return tasksData.filter((task) => task.tags.size).length;
      }
    },
    {
      title: `archive`,
      get count() {
        return tasksData.filter((task) => task.isArchive).length;
      }
    },
  ];
};

export const filtersData = getFiltersData(allTasksData);
