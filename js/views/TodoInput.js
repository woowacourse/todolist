import { EVENT_TYPE, KEY_TYPE, TEXT_TYPE } from '../utils/Constants.js';

export default class TodoInput {
    constructor({ onAdd }) {
        this.$todoInput = document.querySelector('#new-todo-title');
        this.$todoInput.addEventListener(EVENT_TYPE.KEY_PRESS, (event) => this.addTodoItem(event, onAdd));
    }

    addTodoItem(event, onAdd) {
        if (!Object.is(event.key, KEY_TYPE.ENTER)) {
            return;
        }
        const $newTodoTarget = event.target;
        onAdd($newTodoTarget.value);
        $newTodoTarget.value = TEXT_TYPE.EMPTY;
    }
}
