export function TodoCount() {
  this.$todoCount = document.querySelector(".todo-count");

  this.render = count => {
    this.$todoCount.innerHTML = `총 ${count} 개`;
  }
}
