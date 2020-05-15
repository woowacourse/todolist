import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import { getUUID } from "./util/uuid.js";
import { DEFAULT_DATA } from "./util/data.js";
import { STATUS } from "./util/constants.js";


class TodoCount {
  constructor(count) {
    this.$todoCount = document.querySelector(".todo-count");
    this.render(count);
  }

  render(count) {
    this.$todoCount.innerHTML = `총 ${count} 개`;
  }
}

export default class TodoApp {
  constructor() {
    this.items = DEFAULT_DATA || [];
    this.todoList = new TodoList(
      this.items,
      {
        toggleCompleteHandler: this.handleToggleComplete.bind(this),
        deleteHandler: this.handleDeleteTodo.bind(this),
        toggleEditingHandler: this.handleToggleEditing.bind(this),
        editHandler: this.handleEditTodo.bind(this),
      }
    );
    this.todoInput = new TodoInput({ addTodoHandler: this.handleAddTodo.bind(this) });
    this.todoCount = new TodoCount(this.items.length);
  }

  setState(items) {
    this.items = items;
    this.todoList.render.call(this.todoList, this.items);
    this.todoCount.render.call(this.todoCount, this.items.length);
  }

  handleAddTodo(content) {
    this.setState(this.items.concat({ id: getUUID(), title: content }));
  }

  handleDeleteTodo(id) {
    this.setState(this.items.filter(item => item.id !== id));
  }

  handleToggleComplete(id) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        status: item.status === STATUS.COMPLETED ? null : STATUS.COMPLETED
      }
    ));
  }

  handleToggleEditing(id) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        status: item.status && item.status.includes(STATUS.EDITING)
          ? item.status.replace(STATUS.EDITING, "")
          : [item.status, STATUS.EDITING].join(" ")
      }
    ));
  }

  handleEditTodo(id, content) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        title: content,
        status: item.status.replace("editing", "")
      }
    ));
  }
}
