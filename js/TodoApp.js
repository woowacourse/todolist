import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";
import {TodoItem} from "./component/TodoItem.js";
import {TodoCount} from "./component/TodoCount.js";

const TodoApp = class {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput({
      onAdd: this.addTodo.bind(this)
    })
    this.todoList = new TodoList({
      onComplete: this.completeTodo.bind(this),
      onDelete: this.deleteTodoHandler.bind(this),
      toggleEdit: this.toggleEditingTodo.bind(this),
      onEdit: this.editTodo.bind(this)
    })
    this.todoCount = new TodoCount(this.todoItems.length);
  }

  setState(updatedItems) {
    this.todoItems = updatedItems;
    this.todoList.render(this.todoItems);
    this.todoCount.render(this.todoItems.length);
  }

  addTodo(item) {
    this.todoItems.push(new TodoItem(item));
    this.setState(this.todoItems);
  }

  completeTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkCompleted(id))
    );
  }

  deleteTodoHandler(id) {
    this.setState(
      this.todoItems.filter(item => !item.isSameId(id))
    )
  }

  toggleEditingTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkEditing(id))
    )
  }

  editTodo(id, value) {
    this.setState(
      this.todoItems.map(item => item.edit(id, value))
    )
  }
}

new TodoApp();