import { todoItemTemplate } from '../util/template.js';

// todoList 보여주는 컴포넌트
export function TodoList({ onToggle }) {
  this.$todoList = document.querySelector("#todo-list"); // todo: const로 선언해야하려나?

  this.$todoList.addEventListener("click", event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      onToggle($target.dataset.id);
    }
  });

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}
