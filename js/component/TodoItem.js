// todoItem
export function TodoItem(id, contents, isCompleted = false) {
  this.id = id;
  this.contents = contents;
  this.isCompleted = isCompleted;
  this.status = "";
  this.toggleCompleteStatus = () => {
    this.isCompleted = !this.isCompleted;
    this.status === "" ? this.status = "completed" : this.status = "";
  };
  this.toggleEditStatus = () => {
    if (this.status === "completed") return;
    this.status === "" ? this.status = "editing" : this.status = "";
  };
}
