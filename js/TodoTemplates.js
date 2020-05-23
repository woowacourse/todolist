export const todoItemTemplate = (todoItem) => `
   <li class="${todoItem.isCompleted ? "completed" : ""}" data-id="${todoItem.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todoItem.isCompleted ? "checked" : ""}>
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoItem.content}">
      </li>
`
