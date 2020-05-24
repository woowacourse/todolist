export const todoItemTemplate = (item, index) => `
    <li class = "view" data-index=${index}>
        <div>
          <input class="toggle" type="checkbox">
          <label class="label">${item}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${item}>
  </li>`
