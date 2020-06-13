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
            onToggleEditMode: this.onToggleEditMode.bind(this),
            onEdit: this.onEdit.bind(this),
        });
        this.todoCount = new TodoCount(this.todoItems.length);
        this.todoFilter = new TodoFilter(this.filter, { onChangeFilter: this.onChangeFilter.bind(this) });
    }

    onAdd(contents) {
        try {
            const newTodoItem = new TodoItem(Date.now(), contents, false, false);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        } catch (error) {
            alert(error.message);
        }
    }

    onEdit(id, contents) {
        try {
            this.onChangeItem((todoItem) => {
                if (todoItem.isSameId(Number(id))) {
                    todoItem.changeContents(contents);
                    todoItem.toggleEditMode();
                }
                return todoItem;
            });
        } catch (error) {
            alert(error.message);
        }
    }

    onDelete(id) {
        const updatedItems = this.todoItems.filter((todoItem) => todoItem.isNotSameId(Number(id)));
        this.setState(updatedItems);
    }

    onToggleCompleted(id) {
        this.onChangeItem((todoItem) => {
            if (todoItem.isSameId(Number(id))) {
                todoItem.toggleCompleted();
            }
            return todoItem;
        });
    }

    onToggleEditMode(id) {
        this.onChangeItem((todoItem) => {
            if (todoItem.isSameId(Number(id))) {
                todoItem.toggleEditMode();
            }
            return todoItem;
        });
    }

    onChangeItem(onChangeFunction) {
        const updatedItems = this.todoItems.map((todoItem) => onChangeFunction(todoItem));
        this.setState(updatedItems);
    }

    onChangeFilter(filterType) {
        this.filter = filterType;
        this.setState(this.todoItems);
    }

    setState(updatedItems) {
        this.todoItems = updatedItems;
        const filteredItems = this.filter.filter(updatedItems);
        this.todoList.render(filteredItems);
        this.todoCount.render(filteredItems.length);
        this.todoFilter.render(this.filter);
    }
}
