export const todoItemTemplate = item => {
  return `<li data-id="${item.id}" class="${item.status}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${item.contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}">
      </li>`;
}

export const todoFiltersTemplate = (filter) => {
  return `<li>
        <a class="all ${filter === "all" && "selected"}" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active ${filter === "active" && "selected"}" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed ${filter === "completed" && "selected"}" href="#/completed">완료한 일</a>
      </li>`;
}
