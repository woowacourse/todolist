import { countTemplate } from './Templates.js';

export function TodoListCount({ selectedTodoItems }) {
  const $count = document.querySelector(".todo-count");
  const $filters = document.querySelector(".filters");
  const $all = document.querySelector(".all");
  const $active = document.querySelector(".active");
  const $completed = document.querySelector(".completed");

  this.list = [];

  this.removeSelected = () => {
    $all.classList.remove("selected");
    $active.classList.remove("selected");
    $completed.classList.remove("selected");
  }

  this.filterTodoItems = event => {
    event.preventDefault();
    this.removeSelected();
    const $target = event.target;
    $target.closest("li").firstElementChild.classList.toggle("selected");

    if ($target.classList.contains("all")) {
      return this.list
    } else if ($target.classList.contains("active")) {
      return [...this.list].filter(todoItem => !todoItem.isCompleted);
    } else {
      return [...this.list].filter(todoItem => todoItem.isCompleted);
    }
  }

  const showFilteredTotoItems = event => {
    const selectedItems = this.filterTodoItems(event);
    this.render(selectedItems);
    selectedTodoItems(selectedItems);
  }

  this.setState = updatedList => {
    this.list = [...updatedList];
    this.render(this.list);
  }

  this.init = () => {
    $filters.addEventListener('click', showFilteredTotoItems);
  };

  this.render = selectedList => {
    $count.innerHTML = countTemplate(selectedList);
  }
}