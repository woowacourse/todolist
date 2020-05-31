import { TodoInput } from './component/TodoInput.js';
import { TodoList } from './component/TodoList.js';
import { TodoItem } from './component/TodoItem.js';
import { TodoCount } from './component/TodoCount.js';
import { TodoFilter } from './component/TodoFilter.js';
import { todoAPI } from '../api/api.js';

function TodoApp(username) {
  this.username = username;
  this.todoItems = [];
  this.filter = "all";

  this.setState = updatedItems => {
    this.todoItems = updatedItems; // todo: 이 코드 필요한가?
    let filteredItems = this.todoItems;
    if (this.filter === "active") {
      filteredItems = this.todoItems.filter(item => item.isCompleted === false);
    } else if (this.filter === "completed") {
      filteredItems = this.todoItems.filter(item => item.isCompleted === true);
    }
    todoList.setState(filteredItems);
    todoCount.render(filteredItems.length);
    todoFilter.render(this.filter);
  };

  new TodoInput({
    onAdd: content => {
      todoAPI.create(this.username, {
        "content": content,
        "isCompleted": false
      })
      .then(() => {
        this.loadData();
      })
      .catch(error => console.log(error));
    }
  });

  const todoList = new TodoList({
    onToggleComplete: _id => {
      todoAPI.complete(username, _id)
      .then(() => {
        const targetItem = this.todoItems.find(item => item._id === _id);
        targetItem.toggleComplete();
        this.setState(this.todoItems);
      })
      .catch(error => console.log(error));
    },
    onDelete: _id => {
      todoAPI.delete(username, _id)
      .then(() => {
        const targetItem = this.todoItems.find(item => item._id === _id);
        this.todoItems.splice(this.todoItems.indexOf(targetItem), 1);
        this.setState(this.todoItems);
      })
      .catch(error => console.log(error));
    },
    onToggleEdit: _id => {
      const targetItem = this.todoItems.find(item => item._id === _id);
      targetItem.toggleEdit();
      this.setState(this.todoItems);
    },
    onEdit: (_id, content) => {
      const targetItem = this.todoItems.find(item => item._id === _id);
      targetItem.content = content;
      targetItem.toggleEdit();
      this.setState(this.todoItems);
    }
  });

  const todoCount = new TodoCount();

  const todoFilter = new TodoFilter(this.filter, {
    onChangeFilter: (filter) => {
      this.filter = filter;
      this.setState(this.todoItems);
    }
  });

  this.loadData = () => {
    todoAPI.getAll(this.username)
    .then(response => {
      this.todoItems = response.map(item => new TodoItem(item));
      this.setState(this.todoItems);
    })
    .catch(error => {
      console.log(error)
    });
  }
}

const todoApp = new TodoApp("chomily");
todoApp.loadData();
