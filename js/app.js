import {completedItemTemplate, todoItemTemplate} from "./templates/template.js";
import {editingItemTemplate} from "./templates/template.js";

function TodoApp() {
    this.addItem = item => {
        this.todoItems.push(item);
        this.todoList.render(this.todoItems);
    };

    this.switchComplete = id => {
        this.todoItems = this.todoItems.map(item => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });
        this.todoList.render(this.todoItems);
    };

    this.openEdit = id => {
        this.todoItems = this.todoItems.map(item => {
            if (item.id === id) {
                item.edit = !item.edit;
            }
            return item;
        });
        this.todoList.render(this.todoItems);
    };

    this.init = () => {
        this.$todoInput.addEventListener("keydown", this.todoInput.onAdd);
        this.$todoList.addEventListener("click", this.todoInput.onComplete);
        this.$todoList.addEventListener("dblclick", this.todoInput.onEdit);
    };

    this.todoItems = [];

    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");

    this.todoList = new TodoList(this);
    this.todoInput = new TodoInput(this);
}

function TodoList({$todoList}) {
    this.render = items => {
        const todoTemplate = items.filter(item => !item.complete).map(item => {
            if (item.edit) {
                return editingItemTemplate(item);
            }
            return todoItemTemplate(item);
        });
        const completedTemplate = items.filter(item => item.complete).map(completedItemTemplate);
        $todoList.innerHTML = todoTemplate.join("") + completedTemplate.join("");
    };
}

function TodoInput({addItem, switchComplete, openEdit}) {
    this.onAdd = event => {
        const $newTodoItem = event.target;

        if (event.key === "Enter" && $newTodoItem.value) {
            addItem({
                id: "#" + Math.random(),
                title: $newTodoItem.value,
                complete: false,
                edit: false
            });

            $newTodoItem.value = "";
        }
    };

    this.onComplete = event => {
        const $target = event.target;

        if ($target.classList.contains("toggle")) {
            const id = $target.closest("li").dataset.id;
            switchComplete(id);
        }
    };

    this.onEdit = event => {
        const $target = event.target;

        if ($target.classList.contains("label")) {
            const id = $target.closest("li").dataset.id;
            openEdit(id);
        }
    }
}

const todoApp = new TodoApp();
todoApp.init();