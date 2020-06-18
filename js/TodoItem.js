export default class TodoItem {
  constructor(id, content, isCompleted = false) {
    this.id = id
    this.content = content
    this.isCompleted = isCompleted
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted
  }

  updateContent(content) {
    this.content = content
  }
}
