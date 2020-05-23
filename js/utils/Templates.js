export const todoItemTemplate = item =>
  `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${item}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item}">
      </li>`