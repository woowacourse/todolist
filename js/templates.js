export const todoItemTemplate = (item) => {
    return `<li data-id="${item.id}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${item.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
      </li>`
}

export const completedItemTemplate = (item) => {
    return `<li data-id="${item.id}" class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label class="label">${item.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
      </li>`
}
