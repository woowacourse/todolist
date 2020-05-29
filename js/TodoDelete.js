import { EVENT_TYPE } from "./constants.js"

export function TodoDelete({onDelete}) {
    const $todoList = document.querySelector('#todo-list')  // 이벤트 위임

    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.clickDestroyBtn(event))

    this.clickDestroyBtn = event => {  // 내부 콜백 함수
        const $target = event.target;
        if (!$target.classList.contains('destroy')) {
            return;
        }
        event.preventDefault();
        if (confirm("삭제하시겠습니까?")) {
            onDelete($target.closest('li').id);
        }
    }
}