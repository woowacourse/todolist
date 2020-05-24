import {EVENT_TYPE, KEY_CODE} from "../utils/constants.js";

export function TodoInput({onAdd}) {
    const $input = document.querySelector("#new-todo-title");

    const onInputHandler = event => {
        if (event.code === KEY_CODE.ENTER) {
            onAdd($input.value);
            $input.value = "";
        }
    };

    $input.addEventListener(EVENT_TYPE.KEY_DOWN, onInputHandler);
}