import { STATE } from './constants.js';

export const todoItemTemplate = todoItem =>
  `<li class="todo-item" data-id="${todoItem._id}" data-status="${todoItem.isCompleted}">
    <div class="view">
      <input id="check-item" class="toggle" type="checkbox" ${todoItem.isCompleted === STATE.COMPLETE ? "checked" : ""}>
      <label class="label">${todoItem.content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todoItem.content}">
  </li>`;

export const todoStatusTemplate = todoStatus =>
  `<li>
        <a class="all ${todoStatus === "all" ? "selected" : ""}" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active ${todoStatus === "active" ? "selected" : ""}" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed ${todoStatus === "completed" ? "selected" : ""}" href="#/completed">완료한 일</a>
      </li>
  `;

export const todoCountTemplate = todoCount =>
  `총 <strong>${todoCount}</strong> 개`;
