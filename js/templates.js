export const todoItemTemplate = item => {
    return `<li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.title}>
        </li>`
}
