import {todoFilterTemplate} from "../templates/TodoFilterTemplate.js";
import {EVENT_TYPE} from "../constant/event.js";
import {COMPLETED_FILTER, ACTIVE_FILTER, ALL_FILTER} from "../constant/filter.js";
import {FILTER_CLASS} from "../constant/filter.js";


export function TodoFilter(changeFilter) {
  const $filters = document.querySelector(".filters");

  this.filters = [COMPLETED_FILTER, ACTIVE_FILTER, ALL_FILTER];

  this.getFilter = (url) => {
    const evaluatedUrl = url ? url : window.location.href;
    const [filter] = this.filters.filter(filter => evaluatedUrl.includes(filter.condition));
    return filter;
  };

  this.filterHandler = (event) => {
    const $target = event.target;
    if (!$target.classList.contains(FILTER_CLASS.filter)) {
      return;
    }
    changeFilter(this.getFilter($target.href));
  };

  this.render = (selectedFilter) => {
    const filterTemplate = this.filters.map(filter => {
      const isSelected = filter === selectedFilter;
      return todoFilterTemplate(filter, isSelected)
    }).join("");

    $filters.innerHTML = filterTemplate;
  };

  $filters.addEventListener(EVENT_TYPE.CLICK, this.filterHandler);
}