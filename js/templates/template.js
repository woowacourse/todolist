export const todoItemTemplate = item => {
    return `<li id="${item.id}" data-id="${item.id}">
        <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
        </li>`;
};

export const editingItemTemplate = item => {
    return `<li class="editing" data-id="${item.id}">
        <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
        </li>`;
};

export const completedItemTemplate = item => {
    return `<li class="completed" data-id="${item.id}">
        <div class="view">
        <input class="toggle" type="checkbox" checked>
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
        </li>`;
};

export const todoCountTemplate = count => {
    return `총 <strong>${count}</strong> 개`;
};