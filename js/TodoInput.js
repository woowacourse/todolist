// 입력 받는 컴포넌트
export function TodoInput({ onAdd }) {
    const $todoInput = document.querySelector("#new-todo-title")

    $todoInput.addEventListener("keyup", event => this.addTodoItem(event))

    this.addTodoItem = event => {
        const $newTodoTarget = event.target  // 이벤트(keydown)가 일어나는 엘리먼트 (input)
        if (this.isValid(event, $newTodoTarget.value)) {
            event.preventDefault()  // 이벤트의 기본 등작을 멈춘다.
            onAdd($newTodoTarget.value)
            $newTodoTarget.value = ""
        }
    }

    this.isValid = (event, value) => {
        return event.key === 'Enter' && value !== null && value !== ""
    }
}