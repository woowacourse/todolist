export const todoItemTemplate = item =>
` <li data-id="${item.id}">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit">
  </li>`;