const todoItemClassTemplate = (todoItem) => {
    return todoItem.isCompleted ? ` class="completed"` : ``;
};

export const todoItemTemplate = (todoItem) => `
<li data-id="${todoItem.id}"${todoItemClassTemplate(todoItem)}>
<div class="view">
  <input class="toggle" type="checkbox" ${todoItem.isCompleted ? 'checked' : ''}>
  <label class="label">${todoItem.contents}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="${todoItem.contents}">
</li>
`;
