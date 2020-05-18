export const todoItemTemplate = (items,index) => {
    return `<li data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${items}">
      </li>`
}
