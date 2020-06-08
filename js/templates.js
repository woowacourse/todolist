export function todoItemTemplate(todoItem) {
  if (todoItem.status === "completed") {
    return `<li class="${todoItem.status}" id="${todoItem.id}">
          <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  } else {
    return `<li class="${todoItem.status}" id="${todoItem.id}">
          <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  }
}

export function allFilterTemplate(total) {
  return `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all selected" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
}

export function activeFilterTemplate(total) {
  return `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active selected" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
}

export function completeFilterTemplate(total) {
  return `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed selected" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
}
