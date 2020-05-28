// 부모 컴포넌트
import {EVENT_TYPE, FILTER_TYPE, KEY_TYPE} from "./constants.js";
import {TodoList} from "./TodoList.js";
import {TodoInput} from "./TodoInput.js";
import {TodoComplete} from "./TodoComplete.js";
import {TodoDelete} from "./TodoDelete.js";
import {TodoEdit} from "./TodoEdit.js";
import {TodoItem} from "./TodoItem.js";
import {TodoCount} from "./TodoCount.js";
import {TodoFilter} from "./TodoFilter.js";

function TodoApp() {
    this.todoItems = [];

    this.setState = (updatedItems, filterType) => {
        const todoList = new TodoList();
        const todoCount = new TodoCount();
        if(filterType === FILTER_TYPE.ALL) {
            this.todoItems = updatedItems;
        }
        todoList.setState(updatedItems);
        todoCount.setCount(updatedItems.length)
    };

    new TodoInput({
        onAdd: item => {
            const newTodoItem = new TodoItem(this.todoItems.length, item,false, "");
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems, FILTER_TYPE.ALL);
        }
    });

    new TodoComplete({
        onComplete: itemId => {
            this.todoItems[itemId].completed = !this.todoItems[itemId].completed;
            this.todoItems[itemId].state = this.todoItems[itemId].completed ? "completed" : "";
            this.setState(this.todoItems, FILTER_TYPE.ALL);
        }
    });

    new TodoDelete({
       onDelete: itemId => {
            this.todoItems.splice(itemId,1);
            for(let i = itemId; i < this.todoItems.length; i++) {
                this.todoItems[i].id = i;
            }
           this.setState(this.todoItems, FILTER_TYPE.ALL);
       }
    });

    new TodoEdit({
       onEdit: (itemId) => {
               this.todoItems[itemId].state = "editing";
               this.setState(this.todoItems, FILTER_TYPE.ALL);
       },
       onView: (itemId, item, itemState) => {
           this.todoItems[itemId].state = itemState;
           this.todoItems[itemId].title = item;
           this.setState(this.todoItems, FILTER_TYPE.ALL);
       }
    });

    new TodoFilter({
        onFilter: (filter) => {
            let filteredItems;
            const todoItems = this.todoItems;
            if(filter === FILTER_TYPE.ACTIVE) {
                filteredItems = this.todoItems.filter(item => !item.completed);
                this.setState(filteredItems, FILTER_TYPE.ACTIVE);
                return;
            }
            if(filter === FILTER_TYPE.COMPLETED) {
                filteredItems = this.todoItems.filter(item => item.completed);
                this.setState(filteredItems, FILTER_TYPE.COMPLETED);
                return;
            }
            this.setState(todoItems, FILTER_TYPE.ALL);
        }
    });
}

const todoApp = new TodoApp();