export const TodoItem = class {
  constructor({_id, content, isCompleted}) {
    this._id = _id;
    this.content = content;
    this.isCompleted = isCompleted;
    this.isEditing = false;
  }

  create() {
    return `<li class="${this.getStatus()}" data-id="${this._id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${(this.checked())}>
          <label class="label">${this.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${this.content}">
      </li>`;
  }

  getStatus() {
    const classList = [];
    classList.push(this.isCompleted ? "completed" : "");
    classList.push(this.isEditing ? "editing" : "");
    return classList.join(" ");
  }

  checked() {
    return this.isCompleted ? "checked" : "";
  }

  checkCompleted(id) {
    this.isCompleted = this.isSameId(id) ? !this.isCompleted : this.isCompleted;
    return this;
  }

  checkEditing(id) {
    this.isEditing = this.isSameId(id) ? !this.isEditing : this.isEditing;
    return this;
  }

  edit(id, content) {
    this.isEditing = this.isSameId(id) ? !this.isEditing : this.isEditing;
    this.content = this.isSameId(id) ? content : this.content;
    return this;
  }

  isSameId(id) {
    return this._id === id;
  }
};