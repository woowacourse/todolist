import { FILTERS } from "../util/data.js";
import { EVENT, STATUS, TAG } from "../util/constants.js";

const button = ({ type, selected, name }) => `<li>
  <a class="${type} ${selected && "selected"}" href="#/">${name}</a>
</li>`;

class TodoFilter {
  constructor(filter, { filterHandler }) {
    this.filterHandler = filterHandler;
    this.$buttons = document.querySelector(".filters");
    this.$buttons.addEventListener(EVENT.CLICK, (event) => {
      this.addEventListeners(event);
    });
    this.render(filter);
  }

  render(filter) {
    this.$buttons.innerHTML = `${FILTERS(filter).map(filter => button(filter)).join("")}`;
  }

  addEventListeners(event) {
    if (event.target.tagName === TAG.A) {
      const classList = event.target.classList;
      if (classList.contains(STATUS.ALL)) {
        this.filterHandler(STATUS.ALL);
      }
      if (classList.contains(STATUS.ACTIVE)) {
        this.filterHandler(STATUS.ACTIVE);
      }
      if (classList.contains(STATUS.COMPLETED)) {
        this.filterHandler(STATUS.COMPLETED);
      }
    }
  }
}

export default TodoFilter;
