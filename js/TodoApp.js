// 부모 컴포넌트
import {KEY_TYPE, EVENT_TYPE} from "./constants.js";
import {todoItemTemplate} from "./templates.js";

function TodoApp() {
    this.todoItems = [];


    this.setState = updatedItems => {
        const todoList = new TodoList();
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems);
    };

    new TodoInput({
        onAdd: item => {
            const newTodoItem = new TodoItem(this.todoItems.length, item,false);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });

    new TodoComplete({
        onComplete: itemId => {
            this.todoItems[itemId].completed = !this.todoItems[itemId].completed;
            this.setState(this.todoItems);
        }
    });

    new TodoDelete({
       onDelete: itemId => {
            this.todoItems.splice(itemId,1);
            for(let i = itemId; i<this.todoItems.length; i++) {
                this.todoItems[i].id = i;
            }
           this.setState(this.todoItems);
       }
    });
}

function TodoDelete({onDelete}) {
    const $todoList = document.querySelector("#todo-list");

    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.onDeleteItem(event));

    this.onDeleteItem = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("destroy");
        if(!isDeleteButton){
            return;
        }
        const itemId = $target.closest("li").dataset.id;
        onDelete(itemId);
    }
}

function TodoComplete({onComplete}) {
    const $todoList = document.querySelector("#todo-list");

    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.onToggleCompleteItem(event));

    this.onToggleCompleteItem = event => {
        const $target = event.target;
        const isCompleteButton = $target.classList.contains("toggle");
        if(!isCompleteButton){
            return;
        }
        $target.closest("li").classList.toggle("completed");
        const itemId = $target.closest("li").dataset.id;
        onComplete(itemId);
    };

}

// 입력 받는 컴포넌트
function TodoInput({ onAdd }) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener(EVENT_TYPE.KEYDOWN, event => this.addTodoItem(event));

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

    const $todoList = document.querySelector("#todo-list");

    this.setState = updatedTodoItems => {
        this.todoItems = updatedTodoItems;
        this.render(this.todoItems);
    };

    this.render = items => {
        const template = items.map(todoItemTemplate);
        $todoList.innerHTML = template.join("");
    };
}

function TodoItem(id, item, completed) {
    this.id = id;
    this.title = item;
    this.completed = completed;
}

const todoApp = new TodoApp();