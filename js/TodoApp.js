import TodoInput from "./components/TodoInput.js";
import TodoCount from "./components/TodoCount.js";
import TodoList from "./components/TodoList.js";
import TodoData from "./domain/TodoData.js";

function TodoApp() {
    this.todoDatas = [];

    this.setState = updatedItems => {
        this.todoDatas = updatedItems;
        this.todoList.setState(updatedItems);
    }

    const onAddItemHandler = contents => {
        const newTodoItem = new TodoData(this.todoDatas.length, contents);
        this.todoDatas.push(newTodoItem)
        this.setState(this.todoDatas)
    }

    const onToggleItemHandler = (id) => {
       this.todoDatas.filter(todoData => todoData === id)
           .map(todoData => todoData.complete = !todoData.complete)
        this.setState(this.todoDatas)
    }


    this.todoList = new TodoList(onToggleItemHandler);
    this.todoInput = new TodoInput(onAddItemHandler);
    this.todoCount = new TodoCount();

    this.init = () => {
        //     생성자라고 생각하자
    }
}

export default TodoApp;