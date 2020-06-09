const todoItemClassTemplate = isCompleted => isCompleted ? `<li class="completed">`: `<li>`;

export const todoItemTemplate = todoItem => `
${todoItemClassTemplate(todoItem.isCompleted)}
<div class="view">
  <input class="toggle" type="checkbox">
  <label class="label">${todoItem.contents}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="새로운 타이틀">
</li>
`
