const COMPLETED_FILTER = {
  condition: "completed",
  filter: item => item.isComplete(),
};

const ACTIVE_FILTER = {
  condition: "active",
  filter: item => !item.isComplete(),
};

const ALL_FILTER = {
  condition: "",
  filter: item => true,
};

export function TodoFilter(renderFilteredItems) {
  const $filters = document.querySelector(".filters");

  this.filters = [COMPLETED_FILTER, ACTIVE_FILTER, ALL_FILTER];

  this.getFilter = (url) => {
    const [filter] = this.filters.filter(filter => url.includes(filter.condition));
    return filter.filter;
  };

  this.render = (url) => {
      renderFilteredItems(this.getFilter(url));
  };

  this.filterHandler = (event) => {
    const $target = event.target;
    if ($target.tagName === "A") {
      this.render($target.href);
    }
  };

  $filters.addEventListener("click", this.filterHandler);
}