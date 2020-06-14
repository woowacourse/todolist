import {TodoInput} from './TodoInput.js'
import {TodoList} from './TodoList.js'
import {TodoItem} from './TodoItem.js'
import {TodoCount} from './TodoCount.js'

function TodoApp() {
  this.todoItems = [new TodoItem(1, '글쓰기 미션', false),
    new TodoItem(2, '스터디 준비', false),
    new TodoItem(3, '프론트 미션', false)];

  let autoIncrementingId = 3;
  let status = 'all';

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

  const todoList = new TodoList({
    onEdit: (id, value) => {
      editByIdAndValue(id, value);
      this.setState(this.todoItems);
      this.render(this.todoItems, status);
    },
    onToggle: id => {
      toggleById(id);
      this.setState(this.todoItems);
      this.render(this.todoItems, status);
    },
    onDelete: id => {
      deleteById(id);
      this.setState(this.todoItems);
      this.render(this.todoItems, status);
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
        case 'all':
          this.render(this.todoItems, status);
          break;
        case 'active':
          const activeItems = this.todoItems.filter(item => !item.isFinished);
          this.render(activeItems, status);
          break;
        case 'completed':
          const completedItems = this.todoItems.filter(item => item.isFinished);
          this.render(completedItems, status);
          break;
      }
    }
  });

  this.setState = (items) => { //정보 갱신
    this.todoItems = items;
  };

  this.render = (items, status) => { //주어진 정보들로 화면 렌더링
    todoList.render(items);
    todoCount.render(this.todoItems.length, status);
  }

  this.init = () => {
    this.setState(this.todoItems);
    this.render(this.todoItems, 'all');
  }
}

const todoApp = new TodoApp();
todoApp.init();