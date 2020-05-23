export function TodoItem(name, isCompleted = false, isEditing = false) {
  this.name = name;
  this.isCompleted = isCompleted;
  this.isEditing = isEditing;
  this.id = Date.now();

  this.isEquals = (id) => this.id === Number(id);

  this.completedToggle = () => {
    return new TodoItem(name, !isCompleted);
  };

  this.editingItem = () => {
    return new TodoItem(name, isCompleted, !isEditing);
  };

  this.updateItem = (updatingName) => {
    return new TodoItem(updatingName, isCompleted, !isEditing);
  };
}
