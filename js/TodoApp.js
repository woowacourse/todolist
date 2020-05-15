import TodoList from "./components/TodoList.js";
import TodoInput from "./components/TodoInput.js";
import { getUUID } from "./util/uuid.js";
import { DEFAULT_DATA } from "./util/data.js";
import { STATUS } from "./util/constants.js";


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
    new TodoInput({ addTodoHandler: this.handleAddTodo.bind(this) });
  }

  setState(items) {
    this.items = items;
    this.todoList.render.call(this.todoList, this.items);
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
