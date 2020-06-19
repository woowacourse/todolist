import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";
import {TodoItem} from "./component/TodoItem.js";
import {TodoCount} from "./component/TodoCount.js";
import {TodoFilter} from "./component/TodoFilter.js";
import {FILTER} from "./utils/constans.js";

const TodoApp = class {
  constructor() {
    this.todoId = 0;
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

  addTodo(value) {
    const item = {
      id: this.todoId++,
      value: value,
      isCompleted: false,
      isEditing: false
    }
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
    } else if (isActive) {
      this.filter = FILTER.ACTIVE;
    } else if (isCompleted) {
      this.filter = FILTER.COMPLETED;
    }
    this.setState(this.todoItems);
  }
}

new TodoApp();