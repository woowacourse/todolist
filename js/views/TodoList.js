import { todoItemTemplate } from '../utils/Templates.js';
import { EVENT_TYPE, TODO_CLASS_NAME, ELEMENT_TYPE, WORD_TYPE } from '../utils/Constants.js';

class TodoList {
    constructor(todoItems, { onToggleCompleted, onDelete }) {
        this.$todoList = document.querySelector('#todo-list');
        this.addEventListeners(onToggleCompleted, onDelete);
        this.render(todoItems);
    }

    render(todoItems) {
        this.$todoList.innerHTML = todoItems.map((todoItem) => todoItemTemplate(todoItem)).join(WORD_TYPE.EMPTY);
    }

    addEventListeners(onToggleCompleted, onDelete) {
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => {
            this.toggleCompleted(event, onToggleCompleted);
            this.deleteItem(event, onDelete);
        });
    }

    toggleCompleted(event, onToggleCompleted) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.TOGGLE)) {
            return;
        }
        const $todoItem = $target.closest(ELEMENT_TYPE.LIST);
        onToggleCompleted($todoItem.dataset.id);
    }

    deleteItem(event, onDelete) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.DESTROY)) {
            return;
        }
        const $todoItem = $target.closest(ELEMENT_TYPE.LIST);
        onDelete($todoItem.dataset.id);
    }
}

export default TodoList;
