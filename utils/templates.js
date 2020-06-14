export const todoItemTemplate = item => {
  if (item.isFinished) {
    return ` <li class="completed" data-id="${item.id}">
    <div class="view">
        <input class="toggle" type="checkbox" checked>
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.title}">
  </li>`;
  } else {
    return ` <li data-id="${item.id}">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.title}">
  </li>`;
  }
}