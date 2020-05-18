export const todoItemTemplate = items => {
    return `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
      </li>`
}
