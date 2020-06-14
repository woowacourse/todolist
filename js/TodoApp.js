import {TodoInput} from './TodoInput.js'
import {TodoList} from './TodoList.js'
import {TodoItem} from './TodoItem.js'
import {TodoCount} from './TodoCount.js'
import {STATUS} from "../utils/constants.js";

function TodoApp() {
  this.todoItems = [new TodoItem(1, '글쓰기 미션', false),
    new TodoItem(2, '스터디 준비', false),
    new TodoItem(3, '프론트 미션', false)];

  this.status = STATUS.ALL;

  let autoIncrementingId = 3;

  const todoList = new TodoList({
    onEdit: (id, value) => {
      editByIdAndValue(id, value);
      this.setState(this.todoItems);
      this.render(this.todoItems, this.status);
    },
    onToggle: id => {
      toggleById(id);
      this.setState(this.todoItems);
      this.render(this.todoItems, this.status);
    },
    onDelete: id => {
      deleteById(id);
      this.setState(this.todoItems);
      this.render(this.todoItems, this.status);
    }
  });

  new TodoInput({
    onAdd: contents => { //추가하는 메서드를 부모 컴포넌트에서 관리
      const newTodoItem = new TodoItem(++autoIncrementingId, contents, false);
      this.todoItems.push(newTodoItem);
      this.render(this.todoItems, status);
    }
  });

  const todoCount = new TodoCount({
    onChangeStatus: status => {
      switch (status) {
        case STATUS.ALL:
          this.status = STATUS.ALL;
          this.render(this.todoItems, status);
          break;
        case STATUS.ACTIVE:
          const activeItems = this.todoItems.filter(item => !item.isFinished);
          this.status = STATUS.ACTIVE;
          this.render(activeItems, status);
          break;
        case STATUS.COMPLETED:
          const completedItems = this.todoItems.filter(item => item.isFinished);
          this.status = STATUS.COMPLETED;
          this.render(completedItems, status);
          break;
      }
    }
  });

  const editByIdAndValue = (id, value) => {
    for (const todoItem of this.todoItems) {
      if (todoItem.id == id) {
        todoItem.changeTitle(value);
        return;
      }
    }
  }

  const toggleById = id => {
    for (const todoItem of this.todoItems) {
      if (todoItem.id == id) {
        todoItem.toggle();
        return;
      }
    }
  }

  const deleteById = id => {
    const itemToFind = this.todoItems.find(item => item.id == id);
    const index = this.todoItems.indexOf(itemToFind);
    this.todoItems.splice(index, 1);
  }

  this.setState = (items, status) => { //정보 갱신
    this.todoItems = items;
    this.status = status;
  };

  this.render = (items, status) => { //주어진 정보들로 화면 렌더링
    todoList.render(items);
    todoCount.render(this.todoItems.length, status);
  }

  this.init = () => {
    this.setState(this.todoItems, this.status);
    this.render(this.todoItems, STATUS.ALL);
  }
}

const todoApp = new TodoApp();
todoApp.init();