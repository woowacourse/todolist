export const TodoCount = class {
  constructor(count) {
    this.$todoCount = document.querySelector(".todo-count");
    this.render(count);
  }

  render(count) {
    this.$todoCount.innerHTML = `총 <strong>${count}</strong> 개`;
  }
};