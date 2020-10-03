import {
  groupingByActiveTemplate,
  groupingByCompletedTemplate,
  groupingTemplate
} from './templates.js';

export function TodoGrouping(onGroupingAll, onGroupingActive, onGroupingCompleted) {
  this.$todoContainer = document.querySelector(".count-container");
  this.$todoContainer.addEventListener("click", event => this.showTodosByGrouping(event));

  this.showTodosByGrouping = (event) => {
    const $targetClass = event.target.classList;
    if ($targetClass.contains("all")) {
      onGroupingAll(event);
    } else if ($targetClass.contains("active")) {
      onGroupingActive(event);
    } else if ($targetClass.contains("completed")) {
      onGroupingCompleted(event);
    }
  }
  this.render = (items, type) => {
    if (type === "all") {
      this.$todoContainer.innerHTML = groupingTemplate(items);
    } else if (type === "active") {
      this.$todoContainer.innerHTML = groupingByActiveTemplate(items);
    } else if (type === "completed") {
      this.$todoContainer.innerHTML = groupingByCompletedTemplate(items);
    }
  }
}