export const todoItemTemplate = (id, content, completed, editing, isShow) => {
  return isShow ? `<li class="${completed ? 'completed' : ''} ${editing ? 'editing' : ''}" data-item-id="${id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
        <label class="label">${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${content}>
    </li>` : "";
};