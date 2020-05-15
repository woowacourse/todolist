export const todoItemTemplate = (id, content, completed) => {
  return `<li class="${completed ? 'completed' : ''}" data-item-id="${id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
        <label class="label">${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${content}>
    </li>`
};