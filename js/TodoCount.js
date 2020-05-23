export default function TodoCount() {
  const $todoCount = document.querySelector(".todo-count")

  this.render = todoItems => {
    $todoCount.innerHTML = `<span class="todo-count">총 <strong>${todoItems.length}</strong> 개</span>`
  }
}
