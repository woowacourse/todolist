export const todoItemTemplate = item => {
    return `<li class="${item.completed ? "completed" : ""}" data-id ="${item.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${item.completed ? "checked" : ""}>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.title}>
        </li>`
}
