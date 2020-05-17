import TodoInput from './todo/TodoInput.js';
import TodoItem from './todo/TodoItem.js';
import TodoList from './todo/TodoList.js';
import TodoCount from './todo/TodoCount.js';
import { TODO_STATE } from './utils/constants.js';
import TodoFilter from './todo/TodoFilter.js';

function TodoApp() {
  this.todoItems = [];
  this.currentState = TODO_STATE.ALL;

  this.setState = (updatedTodoItems, state) => {
    this.todoItems = updatedTodoItems;
    this.currentState = state;
    todoList.setState(this.todoItems, this.currentState);
    todoCount.setState(this.todoItems, this.currentState);
  }

  this.todoInputMethods = {
    onAddItem: contents => {
      const newTodoItem = new TodoItem(contents, TODO_STATE.ACTIVE);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems, this.currentState);
    }
  };

  this.todoListMethods = {
    onDeleteItem: contents => {
      const deleteItem = new TodoItem(contents);
      const index = this.todoItems.findIndex(item => item.contents === deleteItem.contents);
      this.todoItems.splice(index, 1);
      this.setState(this.todoItems, this.currentState);
    },
    onUpdateItem: (beforeContents, afterContents) => {
      const updateItem = new TodoItem(afterContents, this.currentState);
      const index = this.todoItems.findIndex(item => item.contents === beforeContents);
      this.todoItems.splice(index, 1, updateItem);
      this.setState(this.todoItems, this.currentState);
    },
    onCompleteItem: (contents, state) => {
      const index = this.todoItems.findIndex(item => item.contents === contents)
      this.todoItems[index].state = state;
      this.setState(this.todoItems, this.currentState);
    }
  }

  this.todoFilterMethods = {
    onFilter: (filter) => {
      this.setState(this.todoItems, filter);
    }
  }

  const todoInput = new TodoInput(this.todoInputMethods);
  const todoList = new TodoList(this.todoListMethods);
  const todoCount = new TodoCount();
  const todoFilter = new TodoFilter(this.todoFilterMethods);
}

new TodoApp();