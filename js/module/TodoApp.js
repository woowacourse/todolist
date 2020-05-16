import { TodoInput } from './TodoInput.js'
import { TodoItem } from './TodoItem.js'
import { TodoList } from './TodoList.js';

export function TodoApp() {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoInput = document.querySelector("#new-todo-title");

    this.todoItems = [];
    this.todoList = new TodoList(this.$todoList);

    new TodoInput({
        onAdd: contents => {
            const newTodoItem = new TodoItem(contents);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    }, this.$todoInput);

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.setState(this.todoItems);
    };
}