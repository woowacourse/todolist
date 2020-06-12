export class TodoItem {
  constructor({ content, isCompleted, _id }) {
    this.content = content;
    this.isCompleted = isCompleted;
    this._id = _id;
  }

  changeIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  changeContent(content) {
    this.content = content;
  }
}
