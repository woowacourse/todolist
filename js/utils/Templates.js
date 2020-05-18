export const todoItemTemplate = data => `
<li class="${data.completed ? "completed" : ""}" data-id="${data.id}">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${data.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${data.title}">
</li>`




