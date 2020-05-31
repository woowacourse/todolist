// todoItem
export function TodoItem(item) {
  this._id = item._id;
  this.content = item.content;
  this.isCompleted = item.isCompleted;
  this.isEditing = "";
  this.toggleComplete = () => {
    this.isCompleted = !this.isCompleted;
  };
  this.toggleEdit = () => {
    if (this.isCompleted === true) return;
    this.isEditing === "" ? this.isEditing = "editing" : this.isEditing = "";
  };
}
