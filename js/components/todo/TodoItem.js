export default ({ _id, content, isCompleted, isEditing }) => `
  <li data-id="${_id}" class="todo-item ${
  isCompleted ? "completed" : isEditing ? "editing" : ""
}">
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}>
      <label class="label">${content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${content}">
  </li>
`
