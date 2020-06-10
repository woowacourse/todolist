export const todoListRender = (todoItem) =>
  `<li>
<div class="view" data-id=${todoItem.id}>
  <input class="toggle" type="checkbox">
  <label class="label">${todoItem.content}</label>
<button class="destroy"></button>
  </div>
  <input class="edit" value="${todoItem.content}">
  </li>`