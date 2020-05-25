import {STATE} from "./constants.js";

export const todoItemTemplate = (todo_item) => {
    const isChecked = todo_item.status === STATE.COMPLETED;
    return `<li class = ${todo_item.state} data-index=${todo_item.id}>
        <div>
          <input class="toggle" type="checkbox" checked=${isChecked}>
          <label class="label">${todo_item.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${todo_item.content}>
  </li>`
}

// Todo: 왜 여기에 checked 추가하면 true로 바뀔까? 심지어 <input class="toggle" type="checkbox" checked=false> 일 때도.