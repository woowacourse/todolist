export function TodoItem(name, isCompleted = false) {
  this.name = name;
  this.isCompleted = isCompleted;
  this.id = Date.now();

  this.isEquals = (id) => this.id === Number(id);

  this.completedToggle = () => {
    const item = new TodoItem(name, !isCompleted);
    return item;
  };
}
