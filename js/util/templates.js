import {STATUS} from "./constants.js";

export const todoItemTemplate = item => {
    const itemStatus = item.status === STATUS.COMPLETED ? item.status : "";
    const isChecked = itemStatus === STATUS.COMPLETED ? "checked" : "";
    return `<li class="${itemStatus}">
        <div class="view" data-item-id="${item.id}">
          <input class="toggle" type="checkbox" ${isChecked}>
          <label class="label">${item.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.content}">
      </li>`
};