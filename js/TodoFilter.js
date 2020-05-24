import { EVENT, STATUS } from './utils/constants.js'

export default function TodoFilter({ onSelect }) {
  const $filters = document.querySelector(".filters")
  $filters.addEventListener(EVENT.CLICK, event => onFilterHandler(event))

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
        <a class="${selected === STATUS.ALL ? "all selected" : "all"}" href="#/" data-select="${STATUS.ALL}">전체보기</a>
      </li>
      <li>
        <a class="${selected === STATUS.ACTIVE ? "active selected" : "active"}" href="#/active" data-select="${STATUS.ACTIVE}">해야할 일</a>
      </li>
      <li>
        <a class="${selected === STATUS.COMPLETED ? "completed selected" : "completed"}" href="#/completed" data-select="${STATUS.COMPLETED}">완료한 일</a>
      </li>
    `
}
