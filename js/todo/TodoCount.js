import { TODO_STATE } from '../utils/constants.js';

export default function TodoCount() {
  const $count = document.querySelector('.todo-count strong');

  this.setState = (todoItems, filter) => {
    let count;
    if (filter === TODO_STATE.ALL) {
      count = todoItems.length;
    } else {
      count = todoItems.filter(item => item.state === filter).length;
    }
    this.render(count);
  }

  this.render = count => {
    $count.innerText = count;
  }
}