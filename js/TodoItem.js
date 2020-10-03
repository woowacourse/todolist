export function TodoItem(content, status) {
  this.content = content;
  this.status = status;
  this.reverseStatus = () => {
    if (this.status === "completed") {
      this.status = "ready";
    } else if (this.status === "ready") {
      this.status = "completed";
    }
  };
  this.changeEditingMode = () => {
    this.status = "editing";
  };
  this.changeContents = (newContent) => {
    this.content = newContent;
    this.status = "ready";
  };
  this.rollbackStatus = () => {
    this.status = "ready";
  };
}