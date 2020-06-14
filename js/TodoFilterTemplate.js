import { STATUS } from './utils/constants.js';

export const todoFilterTemplate = selected =>
  `   
      <li>
        <a class="${selected === STATUS.ALL ? "all selected" : STATUS.ALL}" href="#/" data-select="${STATUS.ALL}">전체보기</a>
      </li>
      <li>
        <a class="${selected === STATUS.ACTIVE ? "active selected" : STATUS.ACTIVE}" href="#/active" data-select="${STATUS.ACTIVE}">해야할 일</a>
      </li>
      <li>
        <a class="${selected === STATUS.COMPLETED ? "completed selected" : STATUS.COMPLETED}" href="#/completed" data-select="${STATUS.COMPLETED}">완료한 일</a>
      </li>
    `
