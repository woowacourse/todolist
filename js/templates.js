export const newTodoTemplate = (value) => {
    return `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${value}">
      </li>`
}