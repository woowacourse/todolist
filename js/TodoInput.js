import { EVENT_TYPE, KEY_TYPE } from "./constants.js";

// 입력 받는 컴포넌트
export function TodoInput({ onAdd }) {
    const $todoInput = document.querySelector("#new-todo-title")

    $todoInput.addEventListener(EVENT_TYPE.KEYUP, event => this.addTodoItem(event))

    this.addTodoItem = event => {
        const $todoItem = event.target  // 이벤트(keydown)가 일어나는 엘리먼트 (input)
        if (this.isValid(event, $todoItem.value)) {
            event.preventDefault()  // 이벤트의 기본 등작을 멈춘다.
            onAdd($todoItem.value)
            $todoItem.value = ''
        }
    }

    this.isValid = (event, value) => {
        return event.key === KEY_TYPE.ENTER && value.trim() !== '';
    }
}