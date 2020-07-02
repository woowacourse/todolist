import { KEY_TYPE, STATUS } from '../../utils/constants.js';
import { todoStatusTemplate } from '../../utils/templates.js';

export class TodoStatus {
  constructor({ onSelectStatus }) {
    this.$filters = document.querySelector(".filters");
    this.$filters.addEventListener(KEY_TYPE.CLICK, event => this.selectFilter(event));
    this.onSelectStatus = onSelectStatus;
  }

  selectFilter(event) {
    const $target = event.target;

    if (!$target.classList.contains(STATUS.ALL)
      && !$target.classList.contains(STATUS.COMPLETED)
      && !$target.classList.contains(STATUS.ACTIVE)) {
      return;
    }

    const currentTodoStatus = $target.classList[0];
    this.onSelectStatus(currentTodoStatus);
  }

  render(todoStatus) {
    this.$filters.innerHTML = todoStatusTemplate(todoStatus);
  }

}