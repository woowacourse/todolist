export function renderTodo(todo) {
  const checked = todo.isCompleted ? "checked" : "";
  const state = todo.isCompleted ? "completed" : "undo";
  return `<li class=${state} data-id=${todo._id}>
  <div class="view">
    <input class="toggle" type="checkbox" ${checked}>
    <label class="label">${todo.content}</label>
  <button class="destroy"></button>
    </div>
    <input class="edit" value=${todo.content}>
    </li>`
}