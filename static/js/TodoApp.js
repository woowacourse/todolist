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

    const onCheckHandler = event => {
        // Todo : 좀 더 좋은 방식
        // Todo : node element의 차이? (parentNode, parentElement)
        if (event.target == "input.toggle") {
            event.target.parentNode.className = "completed";
        }
    };

    const initEventListeners = () => {
        $input.addEventListener(EVENT_TYPE.KEY_DOWN, onInputHandler);
        $todo_list.addEventListener(EVENT_TYPE.CLICK, onCheckHandler);
    };

    this.init = () => {
        initEventListeners();
    }
}

const todoApp = new TodoApp();
todoApp.init();