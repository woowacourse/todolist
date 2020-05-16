import { TodoInput } from './TodoInput.js'
import { TodoItem } from './TodoItem.js'
import { TodoList } from './TodoList.js';

export function TodoApp() {
    this.todoList = new TodoList();
    this.todoItems = [];

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.setState(this.todoItems);
    };

    new TodoInput({
        onAdd: contents => {
            const newTodoItem = new TodoItem(contents);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });
}