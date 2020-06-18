export const itemTemplate = (item) => {
  return `<li data-id="${item.id}" class="${item.completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle ${item.completed ? 'checked' : ''}" type="checkbox">
          <label class="label">${item.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}">
      </li>`
}
