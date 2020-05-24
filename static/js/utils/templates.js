export const todoItemTemplate = (todo_item) => `
    <li class = ${todo_item.state} data-index=${todo_item.index}>
        <div>
          <input class="toggle" type="checkbox">
          <label class="label">${todo_item.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${todo_item.content}>
  </li>`
