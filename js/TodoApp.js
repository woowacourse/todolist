import { TodoInput } from './TodoInput.js'
import { TodoList } from './TodoList.js'
import { TodoItem } from './TodoItem.js'
import { TodoCheckBox } from './TodoCheckBox.js'
import { TodoDelete } from './TodoDelete.js'

function TodoApp() {
    const $todoList = document.querySelector('#todo-list')

    this.todoItems = [
        new TodoItem(1, "아침밥"),
        new TodoItem(2, "점심밥")
    ]  // todoItems 를 배열의 상태로 갖고 있다.

    let id = 3
    const todoList = new TodoList()  // TodoList 함수 인스턴스 생성

    this.setState = updatedItems => {  // updatedItems 를 인자로 받아서 setState 함수를 정의.
        this.todoItems = updatedItems  // todoItems 상태를 업데이트
        todoList.setState(this.todoItems)  // todoList 의 상태로 넘겨준다.
    }

    new TodoInput({  // 외부에서 정의된 함수의 인스턴스 생성
        onAdd: contents => {  // 함수 인자로 들어온 contents를 가지고 아래 익명함수를 또 실행한다.
            const newTodoItem = new TodoItem(id++, contents)  // newTodoItem 변수에 TodoItem 인스턴스를 할당한다.
            this.todoItems.push(newTodoItem)  // 현재 todoItems 상태에 추가한다.
            this.setState(this.todoItems)  // 한번더 setState를 수행함과 동시에 todoList에도 상태를 넘겨서 싱크를 맞춰준다.
        }
    })

    new TodoCheckBox({
        onCheck: checkedListId => {
            const listId = parseInt(checkedListId)
            const updatedTodoList = [...this.todoItems].map(todoItem => {  // 각각 새로운 인스턴스 생성
                if (todoItem.id === listId) {
                    return new TodoItem(listId, todoItem.content, !todoItem.completed)
                }
                return todoItem;
            })
            this.setState(updatedTodoList);  // 전체를 한번에 업데이트
        }
    })

    new TodoDelete({
        onDelete: deleteTargetId => {
            const targetId = parseInt(deleteTargetId) // id 안에 있는 id는 문자다. 숫자로 바꿔줘야함.
            this.setState([...this.todoItems].filter(todoItem => todoItem.id !== targetId))
        }
    })

    const switchToEditMode = event => {
        event.preventDefault()
        const $item = event.target.closest('li')
        $item.classList.toggle("editing")
    }

    const switchToViewMode = event => {
        event.preventDefault();
        if (event.key !== 'Escape') {
            return;
        }
        document.getSelection().anchorNode.classList.remove("editing");  // ???
    }

    const initEventListener = () => {
        $todoList.addEventListener('dblclick', switchToEditMode)
        $todoList.addEventListener('keyup', switchToViewMode)
    }

    this.init = () => {
        initEventListener();
        todoList.setState(this.todoItems);  // 어플리케이션이 시작할 때 자식으로 상태를 넘겨준다.
    }
}

const app = new TodoApp();
app.init();