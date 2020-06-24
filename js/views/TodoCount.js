import { countRender } from "../utils/Templates.js";

export class TodoCount {
  constructor() {
    this.$todoCount = document.querySelector(".todo-count");
  }

  render(count) {
    this.$todoCount.innerHTML = countRender(count);
  }
}