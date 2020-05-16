import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import TodoCount from "./components/TodoCount.js";
import TodoFilter from "./components/TodoFilter.js";

import { getUUID } from "./util/uuid.js";
import { DEFAULT_DATA } from "./util/data.js";
import { STATUS } from "./util/constants.js";

export default class TodoApp {
  constructor() {
    this.items = DEFAULT_DATA || [];
    this.filter = STATUS.ALL;
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
    this.todoFilter = new TodoFilter(this.filter, { filterHandler: this.handleFilter.bind(this) });
  }

  setState(items) {
    this.items = items;
    let itemsToShow = this.items;
    if (this.filter === STATUS.ACTIVE) {
      itemsToShow = this.items.filter(item => item.status !== STATUS.COMPLETED);
    }
    if (this.filter === STATUS.COMPLETED) {
      itemsToShow = this.items.filter(item => item.status === STATUS.COMPLETED);
    }
    this.todoList.render.call(this.todoList, itemsToShow);
    this.todoCount.render.call(this.todoCount, itemsToShow.length);
    this.todoFilter.render.call(this.todoFilter, this.filter);
  }

  setFilter(type) {
    this.filter = type;
    this.setState(this.items);
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

  handleFilter(type) {
    this.setFilter(type);
  }
}
