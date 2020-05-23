import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import uuid from './utils/uuid.js';

function TodoApp() {
  const $todoList = document.querySelector("#todo-list")

  this.todoItems = []

  this.render = updatedItems => {
    todoList.render(updatedItems)
  }

  this.setState = updatedItems => {
    this.todoItems = updatedItems
    this.render(updatedItems)
  }

  const todoList = new TodoList();

  new TodoInput({
    onAdd: contents => {
      const newTodoItem = new TodoItem(uuid.create_UUID(), contents)
      this.todoItems.push(newTodoItem)
      this.setState(this.todoItems)
    }
  })

}

new TodoApp()
