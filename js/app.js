import {TodoList} from "./view/outputView.js";

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

    this.setFilter = filter => {
        this.filter = filter;
        this.todoList.render(this.todoItems);
    };

    this.getFilter = () => this.filter;

    this.init = () => {
        this.todoList = new TodoList(this);
        this.todoInput = new TodoInput(this);

        this.$todoInput.addEventListener("keydown", this.todoInput.onAdd);
        this.$todoList.addEventListener("click", this.todoInput.onComplete);
        this.$todoList.addEventListener("dblclick", this.todoInput.onEdit);
        this.$todoList.addEventListener("click", this.todoInput.onDelete);
        this.$filters.addEventListener("click", this.todoInput.onFilter);
    };
}


function TodoInput({addItem, switchComplete, openEdit, deleteItem, setFilter}) {
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

    this.onFilter = event => {
        const $target = event.target;
        const $ul = event.target.closest("ul");
        const $filters = Array.from($ul.getElementsByTagName("li"))
            .map(li => li.querySelector("a"));

        $filters.map(filter => filter.classList.remove("selected"));
        $target.classList.add("selected");
        setFilter($target.dataset.filter);
    };
}

const todoApp = new TodoApp();
todoApp.init();