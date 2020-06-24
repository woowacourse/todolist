export class TodoItem {
  constructor({ content, isCompleted, _id }) {
    this.content = content;
    this.isCompleted = isCompleted;
    this._id = _id;
  }

  changeContent(content) {
    this.content = content;
  }
}