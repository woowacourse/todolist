import {todoFilterTemplate} from "../templates/TodoFilterTemplate.js";

const COMPLETED_FILTER = {
  name: "completed",
  condition: "completed",
  content: "완료한 일",
  expression: item => item.isComplete(),
};

const ACTIVE_FILTER = {
  name: "active",
  condition: "active",
  content: "해야할 일",
  expression: item => !item.isComplete(),
};

const ALL_FILTER = {
  name: "all",
  condition: "all",
  content: "전체 보기",
  expression: item => true,
};

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
    if ($target.tagName === "A") {
      changeFilter(this.getFilter($target.href));
    }
  };

  this.render = (selectedFilter) => {
    const filterTemplate = this.filters.map(filter => {
      const isSelected = filter === selectedFilter;
      return todoFilterTemplate(filter, isSelected)
    }).join("");

    $filters.innerHTML = filterTemplate;
  };

  $filters.addEventListener("click", this.filterHandler);
}