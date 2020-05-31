export const todoItemTemplate = item => {
  return `<li data-_id="${item._id}" class=" ${item.isCompleted === true ? "completed" : ""} ${item.isEditing}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${item.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.content}">
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
