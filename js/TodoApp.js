import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";
import {TodoItem} from "./component/TodoItem.js";
import {TodoCount} from "./component/TodoCount.js";
import {TodoFilter} from "./component/TodoFilter.js";
import {FILTER} from "./utils/constans.js";

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
  }

  setState(updatedItems) {
    this.todoItems = updatedItems;
    this.todoList.render(this.filterItems());
    this.todoCount.render(this.todoItems.length);
  }

  filterItems() {
    let showItems = this.todoItems;
    if (this.filter === FILTER.ACTIVE) {
      showItems = this.todoItems.filter(item => !item.isCompleted);
    }
    if (this.filter === FILTER.COMPLETED) {
      showItems = this.todoItems.filter(item => item.isCompleted);
    }
    return showItems;
  }

  addTodo(item) {
    this.todoItems.push(new TodoItem(item));
    this.setState(this.todoItems);
  }

  completeTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkCompleted(id))
    );
  }

  deleteTodo(id) {
    this.setState(
      this.todoItems.filter(item => !item.isSameId(id))
    )
  }

  toggleEditingTodo(id) {
    this.setState(
      this.todoItems.map(item => item.checkEditing(id))
    )
  }

  editTodo(id, value) {
    this.setState(
      this.todoItems.map(item => item.edit(id, value))
    )
  }

  changeView(target) {
    const isAll = target.classList.contains("all");
    const isActive = target.classList.contains("active");
    const isCompleted = target.classList.contains("completed");
    if (isAll) {
      this.filter = FILTER.ALL;
    }
    if (isActive) {
      this.filter = FILTER.ACTIVE;
    }
    if (isCompleted) {
      this.filter = FILTER.COMPLETED;
    }
    this.setState(this.todoItems);
  }
}

new TodoApp();