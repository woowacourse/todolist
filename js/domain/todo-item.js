class TodoItem { 

  constructor(todoTitle) {
    this.title = todoTitle;
    this.completed = false;
    this.isBeingEdited = false;
    
    this.isInNormal = () => {
      return this.completed === false && this.isBeingEdited === false;
    }
  }
}

export default TodoItem;