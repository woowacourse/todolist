export const TodoItem = class {
  constructor({id, value, isCompleted, isEditing}) {
    this.id = id;
    this.value = value;
    this.isCompleted = isCompleted;
    this.isEditing = isEditing;
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
    const classList = [];
    classList.push(this.isCompleted ? "completed" : "");
    classList.push(this.isEditing ? "editing" : "");
    return classList.join(" ");
  }

  isChecked() {
    return this.isCompleted ? "checked" : "";
  }

  isComplete(id) {
    this.isCompleted = this.isSameId(id) ? !this.isCompleted : this.isCompleted;
    return this;
  }

  isEdit(id) {
    this.isEditing = this.isSameId(id) ? !this.isEditing : this.isEditing;
    return this;
  }

  edit(id, value) {
    this.isEditing = this.isSameId(id) ? !this.isEditing : this.isEditing;
    this.value = this.isSameId(id) ? value : this.value;
    return this;
  }

  isSameId(id) {
    return this.id === id;
  }
}