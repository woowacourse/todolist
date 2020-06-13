import { EVENT_TYPE, TODO_CLASS_NAME, TAG_NAME, WORD_TYPE } from '../utils/Constants.js';

const todoItemTemplate = (todoItem) => `
<li data-id="${todoItem.id}" class="${todoItem.state}">
<div class="view">
  <input class="toggle" type="checkbox" ${todoItem.isCompleted() ? 'checked' : ''}>
  <label class="label">${todoItem.contents}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="${todoItem.contents}">
</li>
`;

export default class TodoList {
    constructor(todoItems, { onToggleCompleted, onDelete }) {
        this.$todoList = document.querySelector('#todo-list');
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => {
            this.toggleCompleted(event, onToggleCompleted);
            this.deleteItem(event, onDelete);
        });
        this.render(todoItems);
    }

    toggleCompleted(event, onToggleCompleted) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.TOGGLE)) {
            return;
        }
        const $todoItem = $target.closest(TAG_NAME.LIST);
        onToggleCompleted($todoItem.dataset.id);
    }

    deleteItem(event, onDelete) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.DESTROY)) {
            return;
        }
        const $todoItem = $target.closest(TAG_NAME.LIST);
        onDelete($todoItem.dataset.id);
    }

    render(todoItems) {
        this.$todoList.innerHTML = todoItems.map(todoItemTemplate).join(WORD_TYPE.EMPTY);
    }
}
