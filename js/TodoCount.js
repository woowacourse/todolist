import { EVENT_TYPE, GROUP_TYPE } from "./constants.js";
import { activeFilterTemplate, allFilterTemplate, completeFilterTemplate } from './templates.js';

function TodoCount(groupBy) {
  this.$todoCount = document.querySelector(".count-container");

  this.$todoCount.addEventListener(EVENT_TYPE.CLICK, (event) =>
    this.groupByStatus(event)
  );

  this.groupByStatus = (event) => {
    if (event.target.classList.contains(GROUP_TYPE.ACTIVE)) {
      groupBy(event, GROUP_TYPE.ACTIVE);
    } else if (event.target.classList.contains(GROUP_TYPE.COMPLETED)) {
      groupBy(event, GROUP_TYPE.COMPLETED);
    } else if (event.target.classList.contains(GROUP_TYPE.ALL)) {
      groupBy(event, GROUP_TYPE.ALL);
    }
  };

  this.render = (total, type) => {
    if (type === GROUP_TYPE.ALL || type === undefined) {
      this.$todoCount.innerHTML = allFilterTemplate(total);
    } else if (type === GROUP_TYPE.ACTIVE) {
      this.$todoCount.innerHTML = activeFilterTemplate(total);
    } else if (type === GROUP_TYPE.COMPLETED) {
      this.$todoCount.innerHTML = completeFilterTemplate(total);
    }
  };
}

export default TodoCount;