export const todoItem = todo =>
    `<li class="${todo.state ? "completed" : ""}" data-todo-id="${todo.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.state ? "checked" : ""}>
          <label class="label">${todo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}">
      </li>`

export const todoCount = count =>
  `<span class="todo-count">총 <strong>${count}</strong> 개</span>`