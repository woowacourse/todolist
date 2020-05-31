// todoItem
export function TodoItem(id, contents) {
  this.id = id;
  this.contents = contents;
  this.status = "";
  this.toggleStatus = () => {
    this.status === "" ? this.status = "completed" : this.status = "";
  };
  this.toggleEditMode = () => {
    if (this.status === "completed") return;
    this.status === "" ? this.status = "editing" : this.status = "";
  };
}
