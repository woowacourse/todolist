import {EVENT_TYPE, KEY_CODE} from "./utils/constants.js";
import {todoItemTemplate} from "./utils/templates.js";
import {STATE} from "./utils/constants.js";

function TodoApp() {
    this.todo_items = [];

    const $input = document.querySelector("#new-todo-title");
    const $todo_list = document.querySelector("#todo-list");

    const onInputHandler = event => {
        if (event.code === KEY_CODE.ENTER) {
            this.todo_items.push($input.value);
            this.render(this.todo_items);
            $input.value = "";
        }
    };

    const onCheckHandler = event => {
        // Todo : 좀 더 좋은 방식
        // Todo : node element의 차이? (parentNode, parentElement)
        if (event.target.className === "toggle") {
            if (event.target.checked) {
                event.target.parentElement.className = STATE.COMPLETED;
            } else{
                event.target.parentElement.className =  STATE.VIEW;
            }
        }
    };

    const onDeleteHandler = event => {
        if (event.target.className === "destroy") {
            event.target.parentElement.parentElement.className = STATE.COMPLETED;
            const index = event.target.parentElement.getAttribute("data-index");
            this.todo_items = this.todo_items.slice(parseInt(index));
            this.render(this.todo_items);
        }
    };

    const initEventListeners = () => {
        $input.addEventListener(EVENT_TYPE.KEY_DOWN, onInputHandler);
        $todo_list.addEventListener(EVENT_TYPE.CLICK, onCheckHandler);
        $todo_list.addEventListener(EVENT_TYPE.CLICK, onDeleteHandler);
    };

    // Todo : 수정할 때마다 다 지우고 다시 render 해야 할까?
    this.render = function (todo_items) {
        const template = [];
        todo_items.forEach( function (item, index, array) {
          template.push(todoItemTemplate(item, index));
        });
        $todo_list.innerHTML = template.join("");
    };

    this.init = () => {
        initEventListeners();
    }
}

const todoApp = new TodoApp();
todoApp.init();