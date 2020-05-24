import {EVENT_TYPE, KEY_CODE} from "./utils/constants.js";
import {newTodoItem} from "./utils/templates.js";

function TodoApp() {
    this.todo_Items = [];

    const $input = document.querySelector("#new-todo-title");
    const $todo_list = document.querySelector("#todo-list");

    const onInputHandler = event => {
        if (event.code === KEY_CODE.ENTER) {
            this.todo_Items.push(event.value);
            $todo_list.insertAdjacentHTML('beforeend', newTodoItem($input.value));
        }
    };

    const initEventListeners = () => {
        $input.addEventListener(EVENT_TYPE.KEY_DOWN, onInputHandler)
    };

    this.init = () => {
        initEventListeners();
    }
}

const todoApp = new TodoApp();
todoApp.init();