import { TodoApp } from './module/TodoApp.js'

function App() {
    const todoApp = new TodoApp();

    const showListItem = () => {
        todoApp.setState([]);
    }

    this.init = () => {
        showListItem();
    }
}

const todoListApp = new App();
todoListApp.init();
