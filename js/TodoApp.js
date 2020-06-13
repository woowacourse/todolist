import { TODO_ITEM_STATE } from './utils/Constants.js';
import TodoInput from './views/TodoInput.js';
import TodoList from './views/TodoList.js';
import TodoItem from './views/TodoItem.js';
import TodoCount from './views/TodoCount.js';
import TodoFilter from './views/TodoFilter.js';
import FilterType from './utils/FilterType.js';

export default class TodoApp {
    constructor() {
        this.todoItems = [];
        this.filter = FilterType.ALL;

        this.todoInput = new TodoInput({ onAdd: this.onAdd.bind(this) });
        this.todoList = new TodoList(this.todoItems, {
            onToggleCompleted: this.onToggleCompleted.bind(this),
            onDelete: this.onDelete.bind(this),
        });
        this.todoCount = new TodoCount(this.todoItems.length);
        this.todoFilter = new TodoFilter(this.filter, { onToggleFilter: this.onToggleFilter.bind(this) });
    }

    onAdd(contents) {
        const newTodoItem = new TodoItem(Date.now(), contents, TODO_ITEM_STATE.DOING);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
    }

    onToggleCompleted(id) {
        const updatedItems = this.todoItems.map((todoItem) => {
            if (todoItem.isSameId(Number(id))) {
                todoItem.toggle();
            }
            return todoItem;
        });
        this.setState(updatedItems);
    }

    onEdit(id, contents) {
        const updatedItems = this.todoItems.map((todoItem) => {
            if (todoItem.isSameId(Number(id))) {
                todoItem.contents = contents;
            }
            return todoItem;
        });
        this.setState(updatedItems);
    }

    onToggleFilter(filterType) {
        this.filter = filterType;
        this.setState(this.todoItems);
    }

    onDelete(id) {
        const updatedItems = this.todoItems.filter((todoItem) => todoItem.isNotSameId(Number(id)));
        this.setState(updatedItems);
    }

    setState(updatedItems) {
        this.todoItems = updatedItems;
        const filteredItems = this.filter.filter(updatedItems);
        this.todoList.render(filteredItems);
        this.todoCount.render(filteredItems.length);
        this.todoFilter.render(this.filter);
    }
}
