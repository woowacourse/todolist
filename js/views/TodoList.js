import { todoItemTemplate } from '../utils/Templates.js';
import { EVENT_TYPE, TODO_CLASS_NAME } from '../utils/Constants.js';

class TodoList {
    constructor(todoItems, { onToggleCompleted }) {
        this.$todoList = document.querySelector('#todo-list');
        this.addEventListeners(onToggleCompleted);
        this.render(todoItems);
    }

    render(todoItems) {
        this.$todoList.innerHTML = todoItems.map((todoItem) => todoItemTemplate(todoItem)).join('');
    }

    addEventListeners(onToggleCompleted) {
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => this.toggleCompleted(event, onToggleCompleted));
    }

    toggleCompleted(event, onToggleCompleted) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.TOGGLE)) {
            return;
        }
        const $todoItem = $target.closest('li');
        onToggleCompleted($todoItem.dataset.id);
    }
}

export default TodoList;
