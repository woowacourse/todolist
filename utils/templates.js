export const todoItem = todo =>
    `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${todo}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo}">
      </li>`