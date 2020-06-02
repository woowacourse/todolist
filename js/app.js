import {viewItemTemplate} from "./templates/template.js";

function TodoApp() {
    this.addItem = item => {
        this.todoItems.push(item);
        this.todoList.render(this.todoItems);
    };

    this.init = () => {
        this.$todoInput.addEventListener("keydown", this.todoInput.addTodoItem);
    };

    this.todoItems = [];

    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");

    this.todoList = new TodoList(this.$todoList);
    this.todoInput = new TodoInput(this.addItem);
}

function TodoList($todoList) {
    this.render = items => {
        const template = items.map(viewItemTemplate);
        $todoList.innerHTML = template.join("");
    };
}

function TodoInput(onAdd) {
    this.addTodoItem = event => {
        const $newTodoItem = event.target;

        if (!this.isValid(event, $newTodoItem.value)) {
            return;
        }

        onAdd({title: $newTodoItem.value});
        $newTodoItem.value = "";
    };

    this.isValid = (event, todoTargetValue) => {
        return event.key === "Enter" && todoTargetValue;
    };
}

const todoApp = new TodoApp();
todoApp.init();