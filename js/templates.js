export const todoItemTemplate = (items,index) => {
    return `<li>
        <div class="view" data-index="${index}">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${items}">
      </li>`
}
