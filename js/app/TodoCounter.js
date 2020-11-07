import { ITEM_STATE } from '../constants/constants.js';
import { todoCounterTemplate } from '../utils/template.js';

function TodoCounter({ onSelect }) {

  const $todoCounter = document.querySelector(".count-container");

  const render = (todoItems, selected) => {
    $todoCounter.innerHTML = todoCounterTemplate(todoItems.length, selected);
  }

  const onClickHandler = event => {
    event.preventDefault();
    const $eventTarget = event.target;
    if ($eventTarget.classList.contains("todo-filter")) {
      $eventTarget.classList.add(ITEM_STATE.SELECTED);
      onSelect($eventTarget.dataset.select);
    }
  }

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