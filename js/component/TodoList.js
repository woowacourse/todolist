import { todoItemTemplate } from '../../util/template.js';

// todoList 보여주는 컴포넌트
export function TodoList({ onToggleComplete, onDelete, onToggleEdit, onEdit }) {
  this.$todoList = document.querySelector("#todo-list"); // todo: const로 선언해야하려나?

  this.$todoList.addEventListener("click", event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const $todoItem = $target.closest("li");
      onToggleComplete($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener("click", event => {
    const $target = event.target;
    if ($target.classList.contains("destroy")) {
      const $todoItem = $target.closest("li");
      onDelete($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener("dblclick", event => {
    const $target = event.target;
    if ($target.classList.contains("label")) {
      const $todoItem = $target.closest("li");
      onToggleEdit($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener("keydown", event => {
    const $target = event.target;
    if ($target.classList.contains("edit") && event.key === "Enter") {
      const $todoItem = $target.closest("li");
      onEdit($todoItem.dataset._id, $target.value);
    } else if ($target.classList.contains("edit") && event.key === "Escape") {
      const $todoItem = $target.closest("li");
      onToggleEdit($todoItem.dataset._id);
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
