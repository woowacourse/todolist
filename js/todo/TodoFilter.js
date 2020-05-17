import { EVENT_TYPE, TODO_STATE } from '../utils/constants.js';

export default function TodoFilter(todoFilterMethods) {
  const { onFilter } = todoFilterMethods;

  const $filters = document.querySelector('.filters');
  $filters.addEventListener(EVENT_TYPE.CLICK, e => this.onClickFilter(e));

  this.onClickFilter = e => {
    const $target = e.target;
    const classList = $target.classList;

    this.removeSelected();
    classList.add('selected');
    if (isAll($target, classList)) {
      onFilter(TODO_STATE.ALL);
    }
    if (isActive($target, classList)) {
      onFilter(TODO_STATE.ACTIVE);
    }
    if (isCompleted($target, classList)) {
      onFilter(TODO_STATE.COMPLETED);
    }
  }

  this.removeSelected = () => {
    for (const $li of $filters.children) {
      $li.querySelector('a').classList.remove('selected');
    }
  }

  const isAll = ($target, classList) => {
    return $target && classList.contains('all');
  }

  const isActive = ($target, classList) => {
    return $target && classList.contains('active');
  }

  const isCompleted = ($target, classList) => {
    return $target && classList.contains('completed');
  }
}