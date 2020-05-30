export const todoItemTemplate = item => {
  return `<li class="${item.status}">
        <div class="view">
          <input data-id="${item.id}" class="toggle" type="checkbox">
          <label class="label">${item.contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}">
      </li>`;
}
