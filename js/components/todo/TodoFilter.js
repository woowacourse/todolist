import { FILTER_TYPE } from "../../utils/constants.js"

export default ({ onFilter }) => {
  const $todoFilter = document.querySelector("#todo-filter")

  $todoFilter.onclick = ({ target }) => {
    if (target.classList.contains("all")) {
      onFilter(FILTER_TYPE.ALL)
      return
    }

    if (target.classList.contains("active")) {
      onFilter(FILTER_TYPE.ACTIVE)
      return
    }

    if (target.classList.contains("completed")) {
      onFilter(FILTER_TYPE.COMPLETED)
      return
    }
  }

  return ({ filter }) =>
    ($todoFilter.innerHTML = `
      <li>
        <a class="all ${
          filter === FILTER_TYPE.ALL ? "selected" : ""
        }" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active ${
          filter === FILTER_TYPE.ACTIVE ? "selected" : ""
        }" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed ${
          filter === FILTER_TYPE.COMPLETED ? "selected" : ""
        }" href="#/completed">완료한 일</a>
      </li>
  `)
}
