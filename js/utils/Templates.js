export const todoItemTemplate = data => `
<li class="${data.completed ? "completed" : ""} ${data.editing ? "editing" : ""}" data-id="${data.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${data.completed ? "checked" : ""}>
        <label class="label">${data.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${data.title}">
</li>`

export const todoCountTemplate = count => `총 <strong>${count}</strong> 개`


