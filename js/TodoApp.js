import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import { getUUID } from "./util/uuid.js";
import { DEFAULT_DATA } from "./util/data.js";


export default class TodoApp {
  constructor() {
    this.items = DEFAULT_DATA || [];
    this.todoList = new TodoList(this.items, { toggleCompleteHandler: this.handleToggleComplete.bind(this) });
    new TodoInput({ addTodoHandler: this.handleAddTodo.bind(this) });
  }

  setState(items) {
    this.items = items;
    this.todoList.render.call(this.todoList, this.items);
  }

  handleAddTodo(content) {
    this.setState(this.items.concat({ id: getUUID(), title: content }));
  }

  handleToggleComplete(id) {
    this.setState(this.items.map(item => item.id !== id ? item
      : { ...item, status: item.status === "completed" ? null : "completed" }));
  }
}
