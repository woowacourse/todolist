class TodoCount {
  constructor(count) {
    this.$todoCount = document.querySelector(".todo-count");
    this.render(count);
  }

  render(count) {
    this.$todoCount.innerHTML = `총 ${count} 개`;
  }
}

export default TodoCount;
