export const todoItemTemplate = data =>
	`<li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">${data}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${data}">
  </li>`;