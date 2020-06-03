import {completedItemTemplate, todoItemTemplate} from "./templates/template.js";
import {editingItemTemplate} from "./templates/template.js";
import {todoCountTemplate} from "./templates/template.js";

function TodoApp() {
    this.todoItems = [];

    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoCount = document.querySelector("#todo-count");

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

    this.deleteItem = id => {
        this.todoItems = this.todoItems.filter(item => !(item.id === id));
        this.todoList.render(this.todoItems);
    };

    this.init = () => {
        this.todoList = new TodoList(this);
        this.todoInput = new TodoInput(this);

        this.$todoInput.addEventListener("keydown", this.todoInput.onAdd);
        this.$todoList.addEventListener("click", this.todoInput.onComplete);
        this.$todoList.addEventListener("dblclick", this.todoInput.onEdit);
        this.$todoList.addEventListener("click", this.todoInput.onDelete);
    };
}

function TodoList({$todoList, $todoCount}) {
    this.render = items => {
        const todoTemplate = items.filter(item => !item.complete).map(item => {
            if (item.edit) {
                return editingItemTemplate(item);
            }
            return todoItemTemplate(item);
        });
        const completedTemplate = items.filter(item => item.complete).map(completedItemTemplate);

        const templates = todoTemplate.concat(completedTemplate);
        $todoList.innerHTML = templates.join("");
        $todoCount.innerHTML = todoCountTemplate(templates.length);
    };
}

function TodoInput({addItem, switchComplete, openEdit, deleteItem}) {
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
    };

    this.onDelete = event => {
        const $target = event.target;

        if ($target.classList.contains("destroy")) {
            const id = $target.closest("li").dataset.id;
            deleteItem(id);
        }
    };
}

const todoApp = new TodoApp();
todoApp.init();