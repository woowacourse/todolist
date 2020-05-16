import { itemTemplate } from '../template/template.js';
import { EVENT_TYPE } from '../utils/constants.js';

export default function TodoList() {
  this.$todoList = document.querySelector('#todo-list');
  this.$todoList.addEventListener(EVENT_TYPE.CLICK, e => this.onClickCheckBox(e))

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  }

  this.render = items => {
    const template = items.map(itemTemplate);
    this.$todoList.innerHTML = template.join("");
  }

  this.onClickCheckBox = e => {
    const $target = e.target;
    if ($target && $target.nodeName === 'INPUT') {
      const $list = $target.closest('li');
      const isCompleted = $list.classList.contains('completed');

      if (!isCompleted) {
        $list.classList.add('completed');
      } else {
        $list.classList.remove('completed');
      }
    }
  }
}