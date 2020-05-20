const COMPLETED_FILTER = {
  condition: "completed",
  expression: item => item.isComplete(),
};

const ACTIVE_FILTER = {
  condition: "active",
  expression: item => !item.isComplete(),
};

const ALL_FILTER = {
  condition: "",
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

  $filters.addEventListener("click", this.filterHandler);
}