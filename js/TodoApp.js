import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";
import {TodoItem} from "./component/TodoItem.js";

const TodoApp = class {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput({
      onAdd: this.addTodoHandler.bind(this)
    })
    this.todoList = new TodoList({
      onComplete: this.completeTodoHandler.bind(this),
      onDelete: this.deleteTodoHandler.bind(this)
    })
  }

  setState(updatedItems) {
    this.todoItems = updatedItems;
    this.todoList.render(this.todoItems);
  };

  addTodoHandler(item) {
    this.todoItems.push(new TodoItem(item));
    this.setState(this.todoItems);
  }

  completeTodoHandler(id) {
    this.setState(
      this.todoItems.map(item => item.isComplete(id))
    );
  }

  deleteTodoHandler(id) {
    this.setState(
      this.todoItems.filter(item => !item.isSameId(id))
    )
  }
}

new TodoApp();