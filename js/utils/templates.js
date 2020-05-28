export const todoItemTemplate = item => {
    const itemClass = item.isCompleted ? ' class="completed"' : '';
    const checked = item.isCompleted ? ' checked' : '';
    return `<li${itemClass} data-todo-id="${item["_id"]}">
        <div class="view">
          <input class="toggle" type="checkbox" ${checked}>
          <label class="label">${item.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.content}">
      </li>`
}