import { todoFiltersTemplate } from '../../util/template.js';
import { EVENT_TYPE, FILTER, TAG } from '../../util/constants.js';

export function TodoFilter(filter, { onChangeFilter }) {
  this.$todoFilter = document.querySelector(".filters");

  this.$todoFilter.addEventListener(EVENT_TYPE.CLICK, event => {
    const $target = event.target;
    if ($target.tagName === TAG.A) {
      if ($target.classList.contains(FILTER.ALL)) {
        onChangeFilter(FILTER.ALL);
      } else if ($target.classList.contains(FILTER.ACTIVE)) {
        onChangeFilter(FILTER.ACTIVE);
      } else if ($target.classList.contains(FILTER.COMPLETED)) {
        onChangeFilter(FILTER.COMPLETED);
      }
    }
  });

  this.render = (filter) => {
    this.$todoFilter.innerHTML = todoFiltersTemplate(filter);
  }

  this.render(filter);
}
