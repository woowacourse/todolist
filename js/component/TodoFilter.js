import { todoFiltersTemplate } from '../../util/template.js';

export function TodoFilter(filter, { onChangeFilter }) {
  this.$todoFilter = document.querySelector(".filters");

  this.$todoFilter.addEventListener("click", event => {
    const $target = event.target;
    if ($target.tagName === "A") {
      if ($target.classList.contains("all")) {
        onChangeFilter("all");
      } else if ($target.classList.contains("active")) {
        onChangeFilter("active");
      } else if ($target.classList.contains("completed")) {
        onChangeFilter("completed");
      }
    }
  });

  this.render = (filter) => {
    this.$todoFilter.innerHTML = todoFiltersTemplate(filter);
  }

  this.render(filter);
}
