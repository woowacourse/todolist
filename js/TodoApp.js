import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import { getUUID } from "./util/uuid.js";
import { DEFAULT_DATA } from "./util/data.js";


export default class TodoApp {
  constructor() {
    this.items = DEFAULT_DATA || [];
    new TodoList(this.items);
    new TodoInput({ addTodoHandler: this.handleAddTodo.bind(this) });
  }

  setState(items) {
    this.items = items;
    new TodoList(this.items);
  }

  handleAddTodo(content) {
    this.setState(this.items.concat({ id: getUUID(), title: content }));
  }
}



