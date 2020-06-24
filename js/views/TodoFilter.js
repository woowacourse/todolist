import { EVENT_TYPE, FILTER } from "../utils/Constracts.js";

export class TodoFilter {
  constructor(onFilter) {
    this.$filters = document.querySelector(".filters");
    this.$filters.addEventListener(EVENT_TYPE.CLICK, (event) => {
      this.onFilterHandler(event, onFilter);
    });
  }

  onFilterHandler(event, onFilter) {
    const filter = Object.entries(FILTER).find(
      (value) => value[1] === event.target.classList[0]
    );
    onFilter(filter[1]);
  }
}
