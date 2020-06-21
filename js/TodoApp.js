import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";
import {TodoItem} from "./component/TodoItem.js";
import {TodoCount} from "./component/TodoCount.js";
import {TodoFilter} from "./component/TodoFilter.js";
import {FILTER} from "./utils/constans.js";
import api from "./api/TodoAPI.js";

const TodoApp = class {
  constructor() {
    this.todoItems = [];
    this.filter = FILTER.ALL;
    this.todoInput = new TodoInput({
      onAdd: this.addTodo.bind(this)
    })
    this.todoList = new TodoList({
      onComplete: this.completeTodo.bind(this),
      onDelete: this.deleteTodo.bind(this),
      toggleEdit: this.toggleEditingTodo.bind(this),
      onEdit: this.editTodo.bind(this)
    })
    this.todoCount = new TodoCount(this.todoItems.length);
    this.todoFilter = new TodoFilter({
      onChange: this.changeView.bind(this)
    });

    this.loadItems().then(items => this.setState(items));
  }

  async loadItems() {
    const items = await api.todo.getAll().catch(error => alert(error));
    return items.map(item => new TodoItem(item));
  }

  setState(updatedItems) {
    this.todoItems = updatedItems;
    const showItems = this.filterItems();
    this.todoList.render(showItems);
    this.todoCount.render(showItems.length);
  }

  filterItems() {
    let showItems = this.todoItems;
    if (this.filter === FILTER.ACTIVE) {
      showItems = this.todoItems.filter(item => !item.isCompleted);
    } else if (this.filter === FILTER.COMPLETED) {
      showItems = this.todoItems.filter(item => item.isCompleted);
    }
    return showItems;
  }

  async addTodo(content) {
    await api.todo.create({content}).catch(error => alert(error))
    this.setState(await this.loadItems())
  }

  completeTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkCompleted(id))
    );
    api.todo.toggle(id).catch(error => alert(error));
  }

  deleteTodo(id) {
    this.setState(
      this.todoItems.filter(item => !item.isSameId(id))
    );
    api.todo.delete(id).catch(error => alert(error));
  }

  toggleEditingTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkEditing(id))
    );
  }

  editTodo(id, content) {
    this.setState(
      this.todoItems.map(item => item.edit(id, content))
    );
  }

  changeView(target) {
    const isAll = target.classList.contains("all");
    const isActive = target.classList.contains("active");
    const isCompleted = target.classList.contains("completed");
    if (isAll) {
      this.filter = FILTER.ALL;
    } else if (isActive) {
      this.filter = FILTER.ACTIVE;
    } else if (isCompleted) {
      this.filter = FILTER.COMPLETED;
    }
    this.setState(this.todoItems);
  }
}

new TodoApp();