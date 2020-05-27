// 부모 컴포넌트
import {KEY_TYPE} from "./constants.js";
import {todoItemTemplate} from "./templates.js";

function TodoApp() {
    this.todoItems = [];

    this.setState = updatedItems => {
        const newTodoList = new TodoList();
        this.todoItems = updatedItems;
        newTodoList.setState(this.todoItems);
    };

    new TodoInput({
        onAdd: item => {
            const newTodoItem = new TodoItem(item);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });
}

// 입력 받는 컴포넌트
function TodoInput({ onAdd }) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    this.isValid = function (event, target) {
        return (event && event.key === KEY_TYPE.ENTER) && target.trim() !== "";
    }
}

// todoList 보여주는 컴포넌트
function TodoList() {

    this.$todoList = document.querySelector("#todo-list");

    this.setState = updatedTodoItems => {
        this.todoItems = updatedTodoItems;
        this.render(this.todoItems);
    };

    this.render = items => {
        const template = items.map(todoItemTemplate);
        this.$todoList.innerHTML = template.join("");
    };
}

function TodoItem(item) {
    this.title = item;
}

const todoApp = new TodoApp();