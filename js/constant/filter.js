export const COMPLETED_FILTER = {
  name: 'completed',
  condition: 'completed',
  content: '완료한 일',
  expression: item => item.isComplete(),
};

export const ACTIVE_FILTER = {
  name: 'active',
  condition: 'active',
  content: '해야할 일',
  expression: item => !item.isComplete(),
};

export const ALL_FILTER = {
  name: 'all',
  condition: 'all',
  content: '전체 보기',
  expression: item => true,
};

export const FILTER_CLASS = {
  filter: 'filter',
};