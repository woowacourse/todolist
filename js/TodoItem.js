export class TodoItem {
  constructor(_id, content, isCompleted) {
    this._id = _id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  get id() {
    return this._id;
  }
}
