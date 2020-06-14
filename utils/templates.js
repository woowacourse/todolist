export const todoItemTemplate = item => {
  if (item.isFinished) {
    return ` <li class="completed" data-id="${item.id}">
    <div class="view">
        <input class="toggle" type="checkbox" checked>
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.title}">
  </li>`;
  } else {
    return ` <li data-id="${item.id}">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${item.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.title}">
  </li>`;
  }
}

// export const todoCountTemplate = info => {
//   return `
//     <span class="todo-count">총 <strong>${info.total}</strong> 개</span>
//     <ul class="filters">
//       <li>
//         <a class="all selected" href="#/">전체보기</a>
//       </li>
//       <li>
//         <a class="active" href="#/active">해야할 일</a>
//       </li>
//       <li>
//         <a class="completed" href="#/completed">완료한 일</a>
//       </li>
//     </ul>
// `
