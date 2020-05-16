export const todoItemTemplate = (data) => {
  return `<li class="${
    data.isCompleted === false ? "" : "completed"
  }" data-item-id="${data.id}">
  <div class="view">
    <input class="toggle" type="checkbox" ${
      data.isCompleted === false ? "" : "checked"
    }>
    <label class="label">${data.name}</label>
  <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
    </li>`;
};
