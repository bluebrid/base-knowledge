export const TODO_FILTER_TYPES = {
  SHOW_ALL: 'todos/showAll',
  SHOW_ACTIVE: 'todos/showAcive',
  SHOW_COMPLETED: 'todos/showCompleted',
};

export const FILTER_DEFS = [
  {
    title: 'All',
    name: TODO_FILTER_TYPES.SHOW_ALL,
  },
  {
    title: 'Active',
    name: TODO_FILTER_TYPES.SHOW_ACTIVE,
  },
  {
    title: 'Completed',
    name: TODO_FILTER_TYPES.SHOW_COMPLETED,
  },
];
