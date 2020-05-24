import {todoItemTemplate} from "./utils/templates.js";
import {TodoInput} from "./components/TodoInput.js";
import {TodoCheck} from "./components/TodoCheck.js";
import {TodoEdit} from "./components/TodoEdit.js";
import {TodoDelete} from "./components/TodoDelete.js";

function TodoApp() {
    this.todo_items = [];
    const $todo_list = document.querySelector("#todo-list");

    new TodoInput({
        onAdd: item => {
            this.todo_items.push(item);
            this.render(this.todo_items);
        }
    });

    new TodoCheck();

    new TodoEdit({
        onEdit: (index, modifiedContent) => {
            this.todo_items[index] = modifiedContent;
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
        const template = [];
        todo_items.forEach( function (item, index, array) {
          template.push(todoItemTemplate(item, index));
        });
        $todo_list.innerHTML = template.join("");
    };
}

const todoApp = new TodoApp();