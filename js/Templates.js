export const listTemplate = todoItem => {
  return `<li id="${todoItem._id}" class="${todoItem.isCompleted ? "completed" : ""}">
  <div class="view">
    <input class="toggle" type="checkbox" ${todoItem.isCompleted ? "checked" : "unchecked"}>
    <label class="label">${todoItem.content}</label>
  <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
    </li>`;
};

export const countTemplate = list => {
  return `총 <strong>${list.length}</strong> 개`;
};