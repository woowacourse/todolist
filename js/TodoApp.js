import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";

function TodoApp() {
  let nextId = 1;
  this.todos = [];
  const todoInput = new TodoInput({
    onAdd: content => {
      const newTodo = new TodoItem({ id: nextId++, content });
      const todos = [...this.todos, newTodo];
      this.setState(todos);
    }
  })
  const todoList = new TodoList({
    onRemove: id => {
      const todos = this.todos.filter(todo => todo.id !== id);
      this.setState(todos);
    },
    onUpdate: (id, content) => {
      const todos = this.todos.map(todo => todo.id === id ? new TodoItem({ id, content }) : todo);
      this.setState(todos);
    },
    onCompleted: id => {
      const todos = this.todos.map(todo => todo.id === id ? new TodoItem(todo.id,
        todo.content,
        !todo.isCompleted) : todo);
      this.setState(todos);
    }
  });

  this.setState = updatedTodoItems => {
    this.todos = updatedTodoItems;
    todoList.setState(this.todos);
  }
}

const todoApp = new TodoApp();
