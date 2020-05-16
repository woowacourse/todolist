export function TodoInput({ onAdd }, todoInput) {
    todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.isValid = (event, value) => {
        return (event.key ==="Enter")
            && value.trim().length !== 0;
    }

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)) {
            event.preventDefault();
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}