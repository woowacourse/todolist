import { STATUS, EVENT_TYPE, KEY_TYPE, TAG_TYPE } from "../util/constants.js";
import { TodoInput } from './TodoInput.js';
import { TodoItem } from './TodoItem.js';
import { TodoList } from './TodoList.js';
import { TodoCount } from './TodoCount.js';

function TodoApp() {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoCount = document.querySelector("body > section > div.count-container > span > strong");

    this.todoItems = [];
    this.todoList = new TodoList(this.$todoList);

    let todoItemIndex = this.todoItems.length;

    new TodoCount(event => {
        event.preventDefault();
        const $target = event.target;
        const tag = $target.getAttribute("href");
        if (tag === TAG_TYPE.ALL) {
            this.setState(this.todoItems);
            return;
        }
        if (tag === TAG_TYPE.ACTIVE) {
            const activeItems = this.todoItems.filter(item => item.status === STATUS.TODO);
            this.setState(activeItems);
            return;
        }
        if (tag === TAG_TYPE.COMPLETED) {
            const completedItems = this.todoItems.filter(item => item.status === STATUS.COMPLETED);
            this.setState(completedItems);
        }
    });

    new TodoInput({
        onAdd: contents => {
            const newTodoItem = new TodoItem(todoItemIndex++, contents, STATUS.TODO);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    }, this.$todoInput);

    this.setState = updatedItems => {
        const showItems = updatedItems;
        this.todoList.setState(showItems);
        this.$todoCount.innerText = showItems.length;
    };

    const completedTodoItem = event => {
        event.preventDefault();
        const $target = event.target;
        const isCompletedButton = $target.classList.contains("toggle");
        if (isCompletedButton) {
            const todoItemId = Number.parseInt($target.closest("div").dataset.itemId);
            const targetItem = this.todoItems.find(item => item.id === todoItemId);
            targetItem.status = targetItem.status === STATUS.TODO ? STATUS.COMPLETED : STATUS.TODO;
            this.todoList.setState(this.todoItems);
        }
    };
    
    const removeTodoItem = event => {
        event.preventDefault();
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("destroy");
        if (isDeleteButton) {
            removeTargetTodoItem($target);
        }
    }

    const removeTargetTodoItem = ($target) => {
        const todoItemId = Number.parseInt($target.closest("div").dataset.itemId);
        const targetItem = this.todoItems.find(item => item.id === todoItemId);
        const isConfirmDelete = confirm(`${targetItem.content}를 삭제하시겠습니까?`);
        if (isConfirmDelete) {
            const targetItemIndex = this.todoItems.indexOf(targetItem);
            this.todoItems.splice(targetItemIndex, 1)
            this.setState(this.todoItems);
        }
    }

    const setEditMode = event => {
        event.preventDefault();
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("destroy");
        const isCompletedButton = $target.classList.contains("toggle");
        if (!isDeleteButton && !isCompletedButton) {
            const todoItemId = Number.parseInt($target.closest("div").dataset.itemId);
            const targetItem = this.todoItems.find(item => item.id === todoItemId);
            targetItem.status = STATUS.EDIT;
            this.todoList.setState(this.todoItems);
            document.querySelector("#todo-list > li.editing > input").addEventListener(EVENT_TYPE.KEY_DOWN, editMode);
        }
    }

    const editMode = event => {
        const $target = event.target;
        const todoItemId = Number.parseInt($target.previousSibling.previousSibling.dataset.itemId);
        const targetItem = this.todoItems.find(item => item.id === todoItemId);
        if (event.target.value !== 0 && event.key === KEY_TYPE.ESC) {
            event.preventDefault();
            targetItem.status = STATUS.TODO;
            this.todoList.setState(this.todoItems);
            return;
        }
        if ($target.value.trim() !== 0 && event.key === KEY_TYPE.ENTER) {
            const updateItem = new TodoItem(targetItem.id, $target.value, STATUS.TODO);
            const targetItemIndex = this.todoItems.indexOf(targetItem);
            this.todoItems.splice(targetItemIndex, 1, updateItem);
            this.todoList.setState(this.todoItems);
        }
    }

    const initEventListener = () => {
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, completedTodoItem);
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, removeTodoItem);
        this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, setEditMode);
    }

    this.init = () => {
        initEventListener();
    }
}

const todoApp = new TodoApp();
todoApp.init();