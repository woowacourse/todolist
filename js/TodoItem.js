export function TodoItem(id, item, completed, state) {
    this._id = id;
    this.content = item;
    this.isCompleted = completed;
    this.state = state;
}