function TodoItem({ id, content, isCompleted = false }) {
  this.id = id;
  this.content = content;
  this.isCompleted = isCompleted;
}

export default TodoItem;