import {EVENT_TYPE, KEY_CODE, MESSAGE} from "../utils/constants.js";

export function TodoInput({onAdd}) {
    const $input = document.querySelector("#new-todo-title");

    function isValid (content) {
        if (content === "" || content === null) {
            confirm(MESSAGE.NOT_EMPTY);
            return false;
        }
        return true;
    }

    const onInputHandler = event => {
        if (event.code === KEY_CODE.ENTER) {
            if (isValid($input.value)) {
                onAdd($input.value);
                $input.value = "";
            }
        }
    };

    $input.addEventListener(EVENT_TYPE.KEY_DOWN, onInputHandler);
}