import { countTemplate } from './Templates.js';

export function TodoListCount({ selectedTodoItems }) {
  const $count = document.querySelector(".todo-count");
  const $all = document.querySelector(".all");
  const $active = document.querySelector(".active");
  const $completed = document.querySelector(".completed");

  this.list = [];

  this.removeSelected = () => {
    $all.classList.remove("selected");
    $active.classList.remove("selected");
    $completed.classList.remove("selected");
  }

  const showAllItems = event => {
    event.preventDefault();
    this.removeSelected();
    $all.classList.toggle("selected");
    this.render(this.list);
    selectedTodoItems(this.list);
  }

  const showActiveItems = event => {
    event.preventDefault();
    this.removeSelected();
    $active.classList.toggle("selected");
    const selected = [...this.list].filter(todoItem => !todoItem.isCompleted);
    this.render(selected);
    selectedTodoItems(selected);
  }

  const showCompletedItems = event => {
    event.preventDefault();
    this.removeSelected();
    $completed.classList.toggle("selected");
    const selected = [...this.list].filter(todoItem => todoItem.isCompleted);
    this.render(selected);
    selectedTodoItems(selected);
  }

  this.updateList = updatedList => {
    this.list = [...updatedList];
    this.render(this.list);
  }

  this.init = () => {
    $all.addEventListener('click', showAllItems);
    $active.addEventListener('click', showActiveItems);
    $completed.addEventListener('click', showCompletedItems);
  };

  this.render = selectedList => {
    $count.innerHTML = countTemplate(selectedList);
  }
}