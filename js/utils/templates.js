export const todoItemTemplate = (todoItem) =>
  `<li class="todo-item ${todoItem.status}" data-id="${todoItem.id}" data-status="${todoItem.status}">
    <div class="view">
      <input id="check-item" class="toggle" type="checkbox" ${todoItem.status === "completed" ? "checked" : ""}>
      <label class="label">${todoItem.content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todoItem.content}">
  </li>`