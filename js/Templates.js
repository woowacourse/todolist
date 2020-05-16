export const todoItemTemplate = (data) => {
  return `<li class="${data.completed === null ? "" : data.completed}">
  <div class="view">
    <input class="toggle" type="checkbox" ${
      data.completed === null ? "" : "checked"
    }>
    <label class="label">${data.name}</label>
  <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
    </li>`;
};
