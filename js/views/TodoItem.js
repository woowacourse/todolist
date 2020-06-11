export class TodoItem {
  constructor(id, content, isCompleted) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  changeIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  changeContent(content) {
    this.content = content;
  }
}
