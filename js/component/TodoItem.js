// todoItem
export function TodoItem(id, contents, isCompleted = false) {
  this._id = id;
  this.contents = contents;
  this.isCompleted = isCompleted;
  this.status = "";
  this.toggleCompleteStatus = () => {
    this.isCompleted = !this.isCompleted;
  };
  this.toggleEditStatus = () => {
    if (this.isCompleted === true) return;
    this.status === "" ? this.status = "editing" : this.status = "";
  };
}
