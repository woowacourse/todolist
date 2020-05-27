export const allTodoItemTemplate = (items, index) => {
    return `<li data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${items}">
      </li>`
}

export const completedTodoItemTemplate = (items, index) => {
    return `<li data-index="${index}" class="completed">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${items}">
      </li>`
}

export const activeTodoItemTemplate = (items, index) => {
    return `<li data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${items}">
      </li>`
}
