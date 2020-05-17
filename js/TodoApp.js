import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";
import TodoCounter from "./TodoCounter.js";
import { ITEM_STATE } from "./constants.js";

function TodoApp() {
  let nextId = 1;
  this.todos = [];
  this.selected = ITEM_STATE.ALL;

  const todoInput = new TodoInput({
    onAdd: content => {
      const newTodo = new TodoItem({ id: nextId++, content });
      const todos = [...this.todos, newTodo];
      const selected = this.selected;
      this.setState(todos, selected);
    }
  });

  const todoList = new TodoList({
    onRemove: id => {
      const todos = this.todos.filter(todo => todo.id !== id);
      const selected = this.selected;
      this.setState(todos, selected);
    },
    onUpdate: (id, content) => {
      const todos = this.todos.map(todo => todo.id === id ? new TodoItem({ id, content }) : todo);
      const selected = this.selected;
      this.setState(todos, selected);
    },
    onCompleted: id => {
      const todos = this.todos.map(todo =>
        todo.id === id ? new TodoItem({
          id: todo.id,
          content: todo.content,
          isCompleted: !todo.isCompleted
        }) : todo);
      const selected = this.selected;
      this.setState(todos, selected);
    }
  });

  const todoCounter = new TodoCounter({
    onSelect: selected => {
      this.setState(this.todos, selected);
    }
  });

  this.setState = (updatedTodoItems, selected) => {
    this.todos = updatedTodoItems;
    this.selected = selected;
    const todos = selectedTodos(this.todos, selected);
    todoList.setState(todos, selected);
    todoCounter.setState(todos, selected);
  }

  const selectedTodos = (todos, selected) => {
    switch (selected) {
      case ITEM_STATE.ACTIVE:
        return this.todos.filter(todo => todo.isCompleted === false);
      case ITEM_STATE.COMPLETED:
        return this.todos.filter(todo => todo.isCompleted === true);
      default:
        return this.todos;
    }
  }
}

const todoApp = new TodoApp();
