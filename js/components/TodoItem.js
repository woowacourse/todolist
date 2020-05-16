import { STATUS } from "../util/constants.js";

function template({ id, content, isCompleted, isEditing }) {
  function getStatusClass() {
    const classList = [];
    isCompleted && classList.push(STATUS.COMPLETED);
    isEditing && classList.push(STATUS.EDITING);
    return classList.length ? `class="${classList.join(" ")}"` : "";
  }

  return `<li data-id="${id}" ${getStatusClass()}>
  <div class="view">
    <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}>
    <label class="label">${content}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${content}">
</li>`;
}

export default template;
