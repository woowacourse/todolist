import { STATUS } from './utils/constants.js';

export const todoFilterTemplate = selected => `
      <li>
        <a class="${selected === STATUS.ALL ? STATUS.ALL_SELECTED : STATUS.ALL}" data-select="${STATUS.ALL}" href="#/">전체보기</a>
      </li>
      <li>
        <a class="${selected === STATUS.ACTIVE ? STATUS.ACTIVE_SELECTED : STATUS.ACTIVE}" data-select="${STATUS.ACTIVE}" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="${selected === STATUS.COMPLETED ? STATUS.COMPLETED_SELECTED : STATUS.COMPLETED}" data-select="${STATUS.COMPLETED}" href="#/completed">완료한 일</a>
      </li>
  `
