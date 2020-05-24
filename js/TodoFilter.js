export default function TodoFilter({ onSelect }) {
  const $filters = document.querySelector(".filters")
  $filters.addEventListener("click", event => onFilterHandler(event))

  this.render = selected => {
    $filters.innerHTML = todoFilterTemplate(selected)
  }

  const onFilterHandler = event => {
    event.preventDefault()
    const $target = event.target
    onSelect($target.dataset.select)
  }

  const todoFilterTemplate = selected =>
    `   
      <li>
        <a class="${selected === "all" ? "all selected" : "all"}" href="#/" data-select="all">전체보기</a>
      </li>
      <li>
        <a class="${selected === "active" ? "active selected" : "active"}" href="#/active" data-select="active">해야할 일</a>
      </li>
      <li>
        <a class="${selected === "completed" ? "completed selected" : "completed"}" href="#/completed" data-select="completed">완료한 일</a>
      </li>
    `
}
