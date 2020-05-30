export default ({ onFilter }) => {
  const $todoFilter = document.querySelector("#todo-filter")

  $todoFilter.onclick = ({ target }) => {
    if (target.classList.contains("all")) {
      onFilter("all")
      return
    }

    if (target.classList.contains("active")) {
      onFilter("active")
    }

    if (target.classList.contains("completed")) {
      onFilter("completed")
    }
  }

  return ({ filter }) =>
    ($todoFilter.innerHTML = `
      <li>
        <a class="all ${
          filter === "all" ? "selected" : ""
        }" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active ${
          filter === "active" ? "selected" : ""
        }" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed ${
          filter === "completed" ? "selected" : ""
        }" href="#/completed">완료한 일</a>
      </li>
  `)
}
