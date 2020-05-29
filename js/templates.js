export const todoItemTemplate = item => {
    return `<li class="${item.state}" data-id ="${item.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${item.completed ? "checked" : ""}>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.title}>
        </li>`
};

export const todoCountTemplate = count => {
    return `총 <strong>${count}</strong> 개`
};
