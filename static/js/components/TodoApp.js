import {todoItemTemplate} from "../utils/templates.js";
import {TodoInput} from "./TodoInput.js";
import {TodoCheck} from "./TodoCheck.js";
import {TodoEdit} from "./TodoEdit.js";
import {TodoDelete} from "./TodoDelete.js";
import {STATE} from "../utils/constants.js";
import {TodoItem} from "../TodoItem.js";
import {EVENT_TYPE} from "../utils/constants.js";
import api from "../../API/api.js";

function TodoApp() {
    const $todo_list = document.querySelector("#todo-list");
    const $todo_count = document.querySelector("#count-value");
    const $todo_all_selected = document.querySelector(".count-container .all.selected").parentElement;
    const $todo_active = document.querySelector(".count-container .active").parentElement;
    const $todo_completed = document.querySelector(".count-container .completed");

    new TodoInput({
        onAdd: content => {
            api.todos.create(content)
                .then(setState)
                .then(render);
        }
    });

    new TodoCheck({
        onCheck: (index, STATE) => {
            // const selected = this.todo_items.filter(todo_item => todo_item.id === id);
            // const index = this.todo_items.indexOf(selected); // Todo : 왜 indexOf 안되나? (===, == -> false)

            this.todo_items[index].state = STATE;
            render();
        }
    });

    new TodoEdit({
        startEdit: (id) => {
            const index = this.todo_items.findIndex(todo_item => todo_item.id === id);
            this.todo_items[index].state = STATE.EDITING;
            render();
        },
        cancelEdit: (id) => {
            const index = this.todo_items.findIndex(todo_item => todo_item.id === id);
            this.todo_items[index].state = STATE.VIEW;
            render();
        },
        endEdit: (id, modifiedContent) => {
            api.todos.update(id, modifiedContent)
                .then(setState)
                .then(render);
        }
    });

    new TodoDelete({
        onDelete: (id) => {
            api.todos.delete(id)
                .then(setState)
                .then(render);
        }
    });

    // Todo : 수정할 때마다 다 지우고 다시 render 해야 할까?
    const setState = async () => {
        const responses = await api.todos.get();
        this.todo_items = responses.map((response, index) => new TodoItem(index, response._id, response.content, response.isCompleted));
    };

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

    this.init = async () => {
        // responses.forEach(function(response, index) {
        //     this.todo_items.push(new TodoItem(index, response._id, response.content, response.isCompleted));
        // }); //  Todo : 왜 this.todo_items 인식 못하지? todo_items도 인식 못하는 데 어떻게 해야되나

        setState().then(render);
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