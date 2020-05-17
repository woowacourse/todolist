import { STATUS } from "../util/constants.js";
import {EVENT_TYPE} from "../util/constants.js";
import { TodoInput } from './TodoInput.js'
import { TodoItem } from './TodoItem.js'
import { TodoList } from './TodoList.js';

function TodoApp() {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");

    this.todoItems = [];
    this.todoList = new TodoList(this.$todoList);

    let todoItemIndex = this.todoItems.length;

    new TodoInput({
        onAdd: contents => {
            const newTodoItem = new TodoItem(todoItemIndex++, contents, STATUS.TODO);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    }, this.$todoInput);

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.setState(this.todoItems);
    };

    const completedTodoItem = event => {
        const $target = event.target;
        const isCompletedButton = $target.classList.contains("toggle");
        if (isCompletedButton) {
            const todoItemId = Number.parseInt($target.closest("div").dataset.itemId);
            const targetItem = this.todoItems.find(item => item.id === todoItemId);
            targetItem.status = targetItem.status === STATUS.TODO ? STATUS.COMPLETED : STATUS.TODO;
            this.todoList.setState(this.todoItems);
        }
    };

    const initEventListener = () => {
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, completedTodoItem);
    }

    this.init = () => {
        initEventListener();
    }
}

const todoApp = new TodoApp();
todoApp.init();