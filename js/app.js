import {todoItemTemplate} from "./templates.js"

function TodoApp() {
    this.todoItems = [];

    new TodoInput({
        onAdd: contents => {
            this.todoItems.push(contents);
            new TodoList(this.todoItems);
        }
    });

    new TodoDelete({
        onDelete: index => {
            this.todoItems.splice(index, 1);
            new TodoList(this.todoItems);
        }
    })
}

function TodoInput({onAdd}) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (event.keyCode === 13) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}

function TodoDelete({onDelete}) {
    const $list = document.querySelector("#todo-list");

    $list.addEventListener("click", event => this.delete(event))

    this.delete = event => {
        const $target = event.target;
        if ($target.classList.contains("destroy")) {
            const index = $target.closest("div").dataset.index;
            onDelete(index);
        }
    }
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


