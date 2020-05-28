import { KEY_TYPE } from '../../utils/constants.js';
import { todoStatusTemplate } from '../../utils/templates.js';

export class TodoStatus {
  constructor({ onSelectStatus }) {
    this.status = "all";
    this.$filters = document.querySelector(".filters");
    this.$filters.addEventListener(KEY_TYPE.CLICK, event => this.selectFilter(event));
    this.onSelectStatus = onSelectStatus;
  }

  selectFilter(event) {
    const $target = event.target;

    if ($target.tagName !== "A") {
      return;
    }

    const currentTodoStatus = $target.classList[0];
    this.onSelectStatus(currentTodoStatus);
  }

  setStatus(todoStatus) {
    this.status = todoStatus;
    this.render(this.status);
  };

  render(todoStatus) {
    this.$filters.innerHTML = todoStatusTemplate(todoStatus);
  }

}