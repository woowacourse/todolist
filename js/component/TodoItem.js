export const TodoItem = class {
  constructor({id, value, isCompleted}) {
    this.id = id;
    this.value = value;
    this.isCompleted = isCompleted;
  }

  create() {
    return `<li class="${this.getStatus()}" data-id="${this.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${(this.isChecked())}>
          <label class="label">${this.value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${this.value}">
      </li>`;
  }

  getStatus() {
    return this.isCompleted ? "completed" : "";
  }

  isChecked() {
    return this.isCompleted ? "checked" : "";
  }

  isComplete(id) {
    this.isCompleted = this.isSameId(id) ? !this.isCompleted : this.isCompleted;
    return this;
  }

  isSameId(id) {
    return this.id === id;
  }
}