import {todoItemTemplate} from "../utils/templates.js";
import {TodoInput} from "./TodoInput.js";
import {TodoCheck} from "./TodoCheck.js";
import {TodoEdit} from "./TodoEdit.js";
import {TodoDelete} from "./TodoDelete.js";
import {STATE} from "../utils/constants.js";
import {TodoItem} from "../TodoItem.js";

function TodoApp() {
    this.todo_items = [];
    const $todo_list = document.querySelector("#todo-list");
    const $todo_count = document.querySelector("#count-value");
    const $todo_all_selected = document.querySelector(".count-container .all.selected").parentElement;
    const $todo_active = document.querySelector(".count-container .active").parentElement;
    const $todo_completed = document.querySelector(".completed");

    new TodoInput({
        onAdd: content => {
            const new_todo_item = new TodoItem(this.todo_items.length, content, STATE.VIEW);
            this.todo_items.push(new_todo_item);
            this.render();
        }
    });

    new TodoCheck({
        onCheck: (index, STATE) => {
            this.todo_items[index].state = STATE;
            this.render(this.todo_items);
        }
    });

    new TodoEdit({
        startEdit: (index) => {
            this.todo_items[index].state = STATE.EDITING;
            this.render(this.todo_items);
        },
        cancelEdit: (index) => {
            this.todo_items[index].state = STATE.VIEW;
            this.render(this.todo_items);
        },
        endEdit: (index, modifiedContent) => {
            this.todo_items[index].content = modifiedContent;
            this.todo_items[index].state = STATE.VIEW;
            this.render(this.todo_items);
        }
    });

    new TodoDelete({
        onDelete: deleteIndex => {
            this.todo_items.splice(deleteIndex, 1);
            this.render(this.todo_items);
        }
    });

    // Todo : 수정할 때마다 다 지우고 다시 render 해야 할까?
    this.render = function (todo_items) {
        const template  = todo_items.map(todoItemTemplate);
        $todo_list.innerHTML = template.join("");
        $todo_count.innerHTML = todo_items.length;
    };
}

const todoApp = new TodoApp();