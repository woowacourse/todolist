import {EVENT_TYPE, KEY_TYPE} from "./constants.js";

export function TodoEdit({onEdit, onView}) {
    const $todoList = document.querySelector("#todo-list");
    const $todoEdit = document.querySelector(".todoapp");
    let originItemValue = null;
    let originItemId = null;
    let originItemState = null;
    let isEditing = false;

    $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, event => this.onEdit(event));
    $todoEdit.addEventListener(EVENT_TYPE.KEYDOWN, event => this.onFinishEdit(event));

    this.onEdit = event => {
        if(isEditing) {
            return;
        }
        const $target = event.target;
        const itemId = $target.closest("li").dataset.id;
        originItemValue = $target.closest("label").innerText;
        originItemState = $target.closest("li").className;
        originItemId = itemId;
        isEditing = true;
        onEdit(itemId);
    };

    this.onFinishEdit = event => {
        if(this.isESC(event)) {
            onView(originItemId, originItemValue, "");
            initItem();
            return;
        }
        if(this.isEnter(event)) {
            const edited = document.querySelector(".editing").querySelector(".edit");
            onView(originItemId, edited.value, originItemState);
            initItem();
        }
    };

    const initItem = () => {
        originItemValue = null;
        originItemId = null;
        originItemState = null;
        isEditing = false;
    };

    this.isEnter = function (event) {
        return event && event.key === KEY_TYPE.ENTER;
    };

    this.isESC = function (event) {
        return event && event.key === KEY_TYPE.ESC;
    }
}