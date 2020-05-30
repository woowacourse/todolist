export default (todo) => `
  <li data-id="${todo._id}" class="todo-item ${
  todo.isCompleted ? "completed" : todo.isEditing ? "editing" : ""
}">
    <div class="view">
      <input class="toggle" type="checkbox" ${
        todo.isCompleted ? "checked" : ""
      }>
      <label class="label">${todo.content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.content}"
  </li>
`
