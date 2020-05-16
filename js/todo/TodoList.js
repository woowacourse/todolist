import { itemTemplate } from '../template/template.js';
import { EVENT_TYPE } from '../utils/constants.js';

export default function TodoList(todoListMethods) {
  this.$todoList = document.querySelector('#todo-list');
  this.$todoList.addEventListener(EVENT_TYPE.CLICK, e => this.onClickItem(e))

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  }

  this.render = items => {
    const template = items.map(itemTemplate);
    this.$todoList.innerHTML = template.join("");
  }

  this.onClickItem = e => {
    const $target = e.target;
    if (isCheckBox($target)) {
      onClickCheckBox($target);
    }
    if (isDeleteBtn($target)) {
      onClickDeleteBtn($target);
    }
  }

  const isCheckBox = $target => {
    return $target && $target.nodeName === 'INPUT' && $target.className === 'toggle';
  }

  const onClickCheckBox = $target => {
    const classList = $target.closest('li').classList;
    const isCompleted = classList.contains('completed');

    if (!isCompleted) {
      classList.add('completed');
    } else {
      classList.remove('completed');
    }
  }

  const isDeleteBtn = $target => {
    return $target && $target.nodeName === 'BUTTON';
  }

  const onClickDeleteBtn = $target => {
    const contents = $target.previousElementSibling.innerText;
    todoListMethods.onDeleteItem(contents);
  }
}