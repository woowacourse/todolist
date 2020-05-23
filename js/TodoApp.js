import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import uuid from './utils/uuid.js';
import TodoCount from './TodoCount.js';

function TodoApp() {
  this.todoItems = []

  this.render = updatedItems => {
    todoList.render(updatedItems)
    todoCount.render(updatedItems);
  }

  this.setState = updatedItems => {
    this.todoItems = updatedItems
    this.render(updatedItems)
  }

  const todoCount = new TodoCount();

  const todoList = new TodoList({
    onRemove: id => {
      const updatedItems = this.todoItems.filter(todoItem => todoItem.id !== id)
      this.setState(updatedItems)
    },
    onCompleted: id => {
      const updatedItems = this.todoItems.map(todoItem => {
        if (todoItem.id === id) {
          todoItem.toggleCompleted()
        }
        return todoItem
      })
      this.setState(updatedItems)
    },
    onUpdate: (id, content) => {
      const updatedItems = this.todoItems.map(todoItem => {
        if (todoItem.id === id) {
          todoItem.updateContent(content)
        }
        return todoItem
      })
      this.setState(updatedItems)
    }
  });

  new TodoInput({
    onAdd: contents => {
      const newTodoItem = new TodoItem(uuid.create_UUID(), contents)
      this.todoItems.push(newTodoItem)
      this.setState(this.todoItems)
    }
  })

}

new TodoApp()
