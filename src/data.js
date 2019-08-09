export const cardTasks = [
  {
    color: `black`,
    text: `Example default task with default color.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: false,
    isDeadline: false,
  },
  {
    color: `pink`,
    text: `It is example of repeating task. It marks by wave.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: true,
    isDeadline: false,
  },
  {
    color: `black`,
    text: `This is card with missing deadline. Deadline always marked by red line.`,
    hashTags: [`todo`, `personal`, `important`],
    date: `23 September`,
    time: `11:25 PM`,
    isRepeat: false,
    isDeadline: true,
  },
];

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

export const dataFilters = [
  {
    id: `all`,
    name: `All`,
    count: 10
  },
  {
    id: `overdue`,
    name: `Overdue`,
    count: 0
  },
  {
    id: `today`,
    name: `Today`,
    count: 0
  },
  {
    id: `favorites`,
    name: `Favorites`,
    count: 5
  },
  {
    id: `repeating`,
    name: `Repeating`,
    count: 2
  },
  {
    id: `tags`,
    name: `Tags`,
    count: 3
  },
  {
    id: `archive`,
    name: `Archive`,
    count: 95
  },
];
