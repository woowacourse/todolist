export function renderTodo(todo) {
  const checked = todo.state === "completed" ? "checked" : "";
  return `<li class=${todo.state}>
  <div class="view">
    <input class="toggle" type="checkbox" ${checked}>
    <label class="label">${todo.value}</label>
  <button class="destroy"></button>
    </div>
    <input class="edit" value=${todo.value}>
    </li>`
}