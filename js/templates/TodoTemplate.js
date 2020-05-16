export const todoItemTemplate = (data) => `
<li class="${data.complete ? "completed" : ''} ${data.input ? "editing":''}" data-id="${data.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${
            data.complete ? "checked" : ""
          }>
          <label class="label">${data.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${data.content}">
</li>`;


export const TodoItemCount = length => `
<span class="todo-count">총 <strong>${length +1}</strong> 개</span>
`