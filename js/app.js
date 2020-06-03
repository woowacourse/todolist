import {completedItemTemplate, todoItemTemplate} from "./templates/template.js";

function TodoApp() {
    this.addItem = item => {
        this.todoItems.push(item);
        this.todoList.render(this.todoItems);
    };

    this.toggleComplete = id => {
        this.todoItems = this.todoItems.map(item => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });
        this.todoList.render(this.todoItems);
    };

    this.init = () => {
        this.$todoInput.addEventListener("keydown", this.todoInput.addTodoItem);
        this.$todoList.addEventListener("click", this.todoInput.toggleComplete);
    };

    this.todoItems = [];

    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");

    this.todoList = new TodoList(this);
    this.todoInput = new TodoInput(this);
}

function TodoList({$todoList}) {
    this.render = items => {
        const todoTemplate = items.filter(item => !item.complete).map(todoItemTemplate);
        const completedTemplate = items.filter(item => item.complete).map(completedItemTemplate);
        $todoList.innerHTML = todoTemplate.join("") + completedTemplate.join("");
    };
}

function TodoInput({addItem, toggleComplete}) {
    this.addTodoItem = event => {
        const $newTodoItem = event.target;

        if (event.key === "Enter" && $newTodoItem.value) {
            addItem({
                id: "#" + Math.random(),
                title: $newTodoItem.value,
                complete: false
            });

            $newTodoItem.value = "";
        }
    };

    this.toggleComplete = event => {
        const $target = event.target;

        if ($target.classList.contains("toggle")) {
            const id = $target.closest("li").dataset.id;
            toggleComplete(id);
        }
    }
}

const todoApp = new TodoApp();
todoApp.init();