import {todoItemTemplate} from "../utils/templates.js";
import {TodoInput} from "./TodoInput.js";
import {TodoCheck} from "./TodoCheck.js";
import {TodoEdit} from "./TodoEdit.js";
import {TodoDelete} from "./TodoDelete.js";
import {STATE} from "../utils/constants.js";
import {TodoItem} from "../TodoItem.js";
import {EVENT_TYPE} from "../utils/constants.js";

function TodoApp() {
    this.todo_items = [];
    const $todo_list = document.querySelector("#todo-list");
    const $todo_count = document.querySelector("#count-value");
    const $todo_all_selected = document.querySelector(".count-container .all.selected").parentElement;
    const $todo_active = document.querySelector(".count-container .active").parentElement;
    const $todo_completed = document.querySelector(".count-container .completed");

    new TodoInput({
        onAdd: content => {
            const new_todo_item = new TodoItem(this.todo_items.length, content, STATE.VIEW);
            this.todo_items.push(new_todo_item);
            render();
        }
    });

    new TodoCheck({
        onCheck: (index, STATE) => {
            this.todo_items[index].state = STATE;
            render();
        }
    });

    new TodoEdit({
        startEdit: (index) => {
            this.todo_items[index].state = STATE.EDITING;
            render();
        },
        cancelEdit: (index) => {
            this.todo_items[index].state = STATE.VIEW;
            render();
        },
        endEdit: (index, modifiedContent) => {
            this.todo_items[index].content = modifiedContent;
            this.todo_items[index].state = STATE.VIEW;
            render();
        }
    });

    new TodoDelete({
        onDelete: deleteIndex => {
            this.todo_items.splice(deleteIndex, 1);
            render();
        }
    });

    // Todo : 수정할 때마다 다 지우고 다시 render 해야 할까?
    const render = (state) => {
        let render_todo_items = findTodoItemsByState(state, this.todo_items);

        const template = render_todo_items.map(todoItemTemplate);
        $todo_list.innerHTML = template.join("");
        $todo_count.innerHTML = this.todo_items.length;
    };

    function findTodoItemsByState(state, todo_items) {
        if (state === undefined || state === null || state === "") {
            return todo_items;
        }

        let results = [];
        todo_items.forEach(todo_item => {
            if (todo_item.state === state) {
                results.push(todo_item);
            }
        });
        return results;
    }

    this.init = () => {
        $todo_all_selected.addEventListener(EVENT_TYPE.CLICK, function () {
            render();
        });
        $todo_active.addEventListener(EVENT_TYPE.CLICK, function () {
            render(STATE.VIEW);
        });
        $todo_completed.addEventListener(EVENT_TYPE.CLICK, function () {
            render(STATE.COMPLETED);
        });
    }
}

const todoApp = new TodoApp();
todoApp.init();