import {TodoView} from "./view/todoView.js";
import {TodoInput} from "./view/todoInput.js";

function TodoApp() {
    this.todoItems = [];
    this.filter = "all";

    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoCount = document.querySelector("#todo-count");
    this.$filters = document.querySelector("#filters");

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
        const editItem = this.todoItems.filter(item => item.id === id)[0];
        editItem.edit = true;
        this.todoList.render(this.todoItems);
    };

    this.endEdit = (id, title) => {
        const endedItem = this.todoItems.filter(item => item.id === id)[0];
        endedItem.edit = false;
        endedItem.title = title;
        this.todoList.render(this.todoItems);
    };

    this.deleteItem = id => {
        this.todoItems = this.todoItems.filter(item => !(item.id === id));
        this.todoList.render(this.todoItems);
    };

    this.setFilter = filter => {
        this.filter = filter;
        this.todoList.render(this.todoItems);
    };

    this.getFilter = () => this.filter;

    this.init = () => {
        this.todoList = new TodoView(this);
        this.todoInput = new TodoInput(this);

        this.$todoInput.addEventListener("keydown", this.todoInput.onAdd);
        this.$todoList.addEventListener("click", this.todoInput.onComplete);
        this.$todoList.addEventListener("dblclick", this.todoInput.onEdit);
        this.$todoList.addEventListener("click", this.todoInput.onDelete);
        this.$filters.addEventListener("click", this.todoInput.onFilter);
        this.$todoList.addEventListener("focusout", this.todoInput.onEditEnd);
        this.$todoList.addEventListener("keydown", this.todoInput.onEditEnd);
    };
}

const todoApp = new TodoApp();
todoApp.init();