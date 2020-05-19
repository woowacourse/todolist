import TodoInput from "./components/TodoInput.js";
import TodoCount from "./components/TodoCount.js";
import TodoList from "./components/TodoList.js";
import TodoData from "./domain/TodoData.js";
import TodoFilter from "./components/TodoFilter.js";
import {VIEW_TYPE} from "./domain/ViewType.js";

function TodoApp() {
    this.filterType = VIEW_TYPE.ALL;
    this.todoDatas = [];

    this.setState = (updatedItems, filterType=this.filterType) => {
        this.todoDatas = updatedItems;

        let dummy = updatedItems;
        if (filterType !== VIEW_TYPE.ALL) {
            dummy = dummy.filter(it => it.completed === filterType[1])
        }

        this.todoList.setState(dummy);
        this.todoCount.setState(dummy.length)
    }

    const onAddItemHandler = contents => {
        const newTodoItem = new TodoData(this.todoDatas.length, contents);
        this.todoDatas.push(newTodoItem)
        this.setState(this.todoDatas)
    }

    const onToggleItemHandler = (id) => {
        this.todoDatas.filter(todoData => todoData.id == id)
            .map(todoData => todoData.setCompleted(!todoData.completed))
        this.setState(this.todoDatas)
    }

    const onDeleteItemHandler = (id) => {
        const updatedItems = this.todoDatas.filter(todoData => todoData.id != id)
        this.setState(updatedItems)
    }

    const onEditItemHandler = (id) => {
        this.todoDatas.filter(todoData => todoData.id == id)
            .map(todoData => todoData.setEditing(true))
        this.setState(this.todoDatas);
    }

    const onSubmitItemHandler = (id, title) => {
        this.todoDatas.filter(todoData => todoData.id == id)
            .map(todoData => todoData.setEditing(false))
            .map(todoData => todoData.setTitle(title))
        this.setState(this.todoDatas);
    }

    const onChangeFilterHandler = type => {
        this.filterType = type
        this.setState(this.todoDatas, this.filterType)
    }


    this.todoList = new TodoList(onToggleItemHandler, onDeleteItemHandler, onEditItemHandler, onSubmitItemHandler);
    this.todoInput = new TodoInput(onAddItemHandler);
    this.todoCount = new TodoCount();
    this.todoFilter = new TodoFilter(onChangeFilterHandler);
}

export default TodoApp;