import { ITEM_STATE } from '../constants/constants.js';

export const todoCounterTemplate = (todoItemsLength, selected) => `
    <span class="todo-count">총 <strong>${todoItemsLength}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="todo-filter ${selected === ITEM_STATE.ALL ? ITEM_STATE.ALL + " selected" : ITEM_STATE.ALL}" data-select=${ITEM_STATE.ALL} href="#/">전체보기</a>
      </li>
      <li>
        <a class="todo-filter ${selected === ITEM_STATE.ACTIVE ? ITEM_STATE.ACTIVE + " selected" : ITEM_STATE.ACTIVE}" data-select=${ITEM_STATE.ACTIVE} href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="todo-filter ${selected === ITEM_STATE.COMPLETED ? ITEM_STATE.COMPLETED + " selected" : ITEM_STATE.COMPLETED}" data-select=${ITEM_STATE.COMPLETED} href="#/completed">완료한 일</a>
      </li>
  `;


export const todoItemTemplate = (todo) => `
      <li class="${todo.isCompleted ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.isCompleted ? "checked" : ""}>
          <label class="label">${todo.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.content}">
      </li>`;
