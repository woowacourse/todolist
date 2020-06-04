import { todoItemTemplate } from './templates.js';

// todoList 보여주는 컴포넌트
export function TodoList() {
  const $todoList = document.querySelector('.todo-list');

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join("");
  };
}
