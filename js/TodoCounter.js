import {ITEM_STATE} from './constants.js';

function TodoCounter({ onSelect }) {

  const $todoCounter = document.querySelector(".count-container");

  const render = (todoItems, selected) => {
    $todoCounter.innerHTML = todoCounterTemplate(todoItems.length, selected);
  }

  const onClickHandler = event => {
    event.preventDefault();
    const $eventTarget = event.target;
    if ($eventTarget.tagName !== "A") {
      return;
    }
    const $ul = document.querySelector(".filters");
    $eventTarget.classList.add(ITEM_STATE.SELECTED);
    onSelect($eventTarget.dataset.select);
  }

  const todoCounterTemplate = (todoItemsLength, selected) => `
    <span class="todo-count">총 <strong>${todoItemsLength}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="${selected === ITEM_STATE.ALL ? ITEM_STATE.ALL + " selected" : ITEM_STATE.ALL}" data-select=${ITEM_STATE.ALL} href="#/">전체보기</a>
      </li>
      <li>
        <a class="${selected === ITEM_STATE.ACTIVE ? ITEM_STATE.ACTIVE + " selected" : ITEM_STATE.ACTIVE}" data-select=${ITEM_STATE.ACTIVE} href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="${selected === ITEM_STATE.COMPLETED ? ITEM_STATE.COMPLETED + " selected" : ITEM_STATE.COMPLETED}" data-select=${ITEM_STATE.COMPLETED} href="#/completed">완료한 일</a>
      </li>
  `;

  const setState = (todoItems, selected) => {
    this.todoItems = todoItems;
    render(todoItems, selected);
  }

  $todoCounter.addEventListener("click", onClickHandler);

  return {
    setState,
  }
}

export default TodoCounter;