export function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.render = (todoItems) => {
    const itemsHtml = todoItems.map(item => item.renderingHtml()).join("");
    this.$todoList.innerHTML = itemsHtml;
  }
}
