import {STATUS_TYPE} from "./constants.js"

export const TodoItemTemplate = todoItem => {
    console.log(todoItem)
    if (todoItem.status === STATUS_TYPE.COMPLETED) {
        return `<li id="${todoItem.id}" class="${todoItem.status}">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="completed now ${todoItem.content}">
      </li>`
    } else {
        return `<li id="${todoItem.id}" class="${todoItem.status}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoItem.content}">
      </li>`
    }

}

export const TodoCountTemplate = todoItems => {
    return `총 <strong>${todoItems.length}</strong> 개`;
};