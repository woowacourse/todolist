import {todoItemTemplate} from "./templates.js"
import {isEnterKey} from "./utils.js"

function TodoApp() {
    const $todoList = document.querySelector("#todo-list");

    this.todoItems = [];

    new TodoInput({
        onAdd: contents => {
            this.todoItems.push(contents);
            new TodoList(this.todoItems);
        }
    });

    const initEventListeners = () => {
        $todoList.addEventListener("click", event => this.clickEvent(event));
        $todoList.addEventListener("keydown", event => this.updateEvent(event));
    }

    this.updateEvent = event => {
        const $target = event.target;

        if (isEnterKey(event)) {
            const index = $target.closest("li").dataset.index;
            this.todoItems.splice(index, 1, $target.value);
            new TodoList(this.todoItems);
            $target.closest("li").classList.remove("editing");
        }
    }

    this.clickEvent = event => {
        const $target = event.target;

        if ($target.classList.contains("destroy")) {
            const index = $target.closest("li").dataset.index;
            this.todoItems.splice(index, 1);
            new TodoList(this.todoItems);
        }

        if ($target.classList.contains("label")) {
            $target.closest("li").classList.add("editing")
        }
    }

    this.init = () => {
        initEventListeners();
    }
}

function TodoInput({onAdd}) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (isEnterKey(event)) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}

function TodoList(items) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoCount = document.querySelector("#todo-count");

    this.render = items => {
        const template = items.map((item, index) => todoItemTemplate(item, index));
        this.$todoList.innerHTML = template.join("");
        this.$todoCount.innerText = items.length;
    };

    this.render(items)
}

const index = new TodoApp();
index.init();

