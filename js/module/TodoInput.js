export function TodoInput({ onAdd }) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.isValid = (event, value) => {
        return event.target.value === value;
    }

    this.addTodoItem = event => {
        event.preventDefault();
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)
        && event.key === "Enter") {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}