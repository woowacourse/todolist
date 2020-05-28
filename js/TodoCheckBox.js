export function TodoCheckBox({onCheck}) {
    const $todoList = document.querySelector('#todo-list')

    $todoList.addEventListener('click', event => this.clickCheckbox(event))

    this.clickCheckbox = event => {
        const $target = event.target
        if ($target.type !== 'checkbox') {
            return;
        }
        onCheck($target.closest("li").id)
    }
}