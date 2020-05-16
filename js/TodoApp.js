import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import TodoCount from "./components/TodoCount.js";
import TodoFilter from "./components/TodoFilter.js";

import { getUUID } from "./util/uuid.js";
import { MESSAGE, STATUS } from "./util/constants.js";
import { MOCK_DATA } from "./util/data.js";

class TodoApp {
  constructor() {
    this.items = MOCK_DATA || [];
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
      itemsToShow = this.items.filter(item => !item.isCompleted);
    }
    if (this.filter === STATUS.COMPLETED) {
      itemsToShow = this.items.filter(item => item.isCompleted);
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
    if (content.trim().length === 0) {
      alert(MESSAGE.EMPTY_NOT_ALLOWED);
      return;
    }
    this.setState(this.items.concat({ id: getUUID(), content, isCompleted: false, isEditing: false }));
  }

  handleDeleteTodo(id) {
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      this.setState(this.items.filter(item => item.id !== id));
    }
  }

  handleToggleComplete(id) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        isCompleted: !item.isCompleted
      }
    ));
  }

  handleToggleEditing(id) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        isEditing: !item.isEditing
      }
    ));
  }

  handleEditTodo(id, content) {
    this.setState(this.items.map(item => item.id !== id ? item :
      {
        ...item,
        content,
        isEditing: !item.isEditing
      }
    ));
  }

  handleFilter(type) {
    this.setFilter(type);
  }
}

export default TodoApp;
