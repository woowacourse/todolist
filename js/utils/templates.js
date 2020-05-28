import {TODO_CLASS} from "../utils/constants.js";

export const todoItemTemplate = data =>
	`<li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">${data}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${data}">
  </li>`;

export const todoItemFromApiTemplate = data => {
	const id = data._id;
	const content = data.content;
	const todoClass = data.isCompleted ? TODO_CLASS.COMPLETE : "";
	return `<li class="${todoClass}" data-todo-id="${id}">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">${content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${content}">
  </li>`
};