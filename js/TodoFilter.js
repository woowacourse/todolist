import { EVENT } from './utils/constants.js'
import { todoFilterTemplate } from './TodoFilterTemplate.js';

export default function TodoFilter({ onSelect }) {
  const $filters = document.querySelector(".filters")
  $filters.addEventListener(EVENT.CLICK, event => onFilterHandler(event))

  this.render = selected => {
    $filters.innerHTML = todoFilterTemplate(selected)
  }

  const onFilterHandler = event => {
    event.preventDefault()
    const $target = event.target
    const selected = $target.dataset.select
    onSelect(selected)
    this.render(selected)
  }
}
