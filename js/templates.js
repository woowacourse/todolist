export const todoItemTemplate = item => {
    return `<li class="${item.state}" data-id ="${item._id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}>
            <label class="label">${item.content}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.content}>
        </li>`
};

export const todoCountTemplate = count => {
    return `총 <strong>${count}</strong> 개`
};
