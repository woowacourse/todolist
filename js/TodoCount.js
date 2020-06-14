import {todoItemTemplate} from "../utils/templates.js";
import {EVENT_TYPE} from "../utils/constants.js";

export function TodoCount() {
  const $totalCount = document.querySelector('.todo-count');
  const $allTodosBtn = document.querySelector('.all');
  const $activeTodosBtn = document.querySelector('.active');
  const $completedTodosBtn = document.querySelector('.completed');

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  }

  this.render = (size, status) => {
    $totalCount.innerHTML = `총 <strong>${size}</strong> 개`;
  };

  const onShowAllTodos = event => {
    const isAllTodosBtnClicked = event.target.classList.contains('all');
    if (!isAllTodosBtnClicked) {
      return;
    }
    $activeTodosBtn.classList.remove('selected');
    $completedTodosBtn.classList.remove('selected');
    event.target.closest('a').classList.toggle('selected');
  }

  const onShowActiveTodos = event => {
    const isActiveTodosBtnClicked = event.target.classList.contains('active');
    if (!isActiveTodosBtnClicked) {
      return;
    }
    $allTodosBtn.classList.remove('selected');
    $completedTodosBtn.classList.remove('selected');
    event.target.closest('a').classList.toggle('selected');
  }

  const onShowCompletedTodos = event => {
    const isCompletedTodosBtnClicked = event.target.classList.contains('completed');
    if (!isCompletedTodosBtnClicked) {
      return;
    }
    $allTodosBtn.classList.remove('selected');
    $activeTodosBtn.classList.remove('selected');
    event.target.closest('a').classList.toggle('selected');
  }

  $allTodosBtn.addEventListener(EVENT_TYPE.CLICK, onShowAllTodos);
  $activeTodosBtn.addEventListener(EVENT_TYPE.CLICK, onShowActiveTodos);
  $completedTodosBtn.addEventListener(EVENT_TYPE.CLICK, onShowCompletedTodos);
}
