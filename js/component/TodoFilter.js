import {EVENT_TYPE} from "../utils/constans.js";

export const TodoFilter = class {
  constructor({onChange}) {
    this.fillters = document.querySelector(".filters");
    this.fillters.addEventListener(EVENT_TYPE.CLICK,
      event => this.changeView(onChange, event));
  }

  changeView(onChange, event) {
    const $target = event.target;
    const isBtn = $target.classList.contains("filter");
    if (isBtn) {
      this.changeSelected($target);
      onChange($target);
    }
  }

  changeSelected(target) {
    const selectedBtn = target.closest("ul").querySelector(".selected");
    selectedBtn.classList.remove("selected");
    target.classList.add("selected");
  }
};