export const todoListRender = (todoItem) => {
  console.log(todoItem)
  return (
  `<li data-id=${todoItem._id} class=${todoItem.isCompleted ? "completed" : ""} >
<div class="view">
  <input class="toggle" type="checkbox" ${todoItem.isCompleted ? "checked" : ""}>
  <label class="label">${todoItem.content}</label>
<button class="destroy"></button>
  </div>
  <input class="edit" value="${todoItem.content}">
  </li>`)
}

export const countRender = (count) => `
  총 <strong>${count}</strong> 개
`