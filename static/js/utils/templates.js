export const todoItemTemplate = (item, index) => `
    <li>
        <div class="view" data-index=${index}>
          <input class="toggle" type="checkbox">
          <label class="label">${item}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${item}>
  </li>`
