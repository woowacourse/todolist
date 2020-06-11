import { EVENT_TYPE } from "../utils/Constracts.js";

export class TodoFilter {
  constructor(onFilter) {
    this.$filters = document.querySelector(".filters");
    this.$filters.addEventListener(EVENT_TYPE.CLICK, (event) => {
      this.onFilterHandler(event, onFilter);
    });
  }

  onFilterHandler(event, onFilter) {
    onFilter(event.target.classList[0]);
  }
}
