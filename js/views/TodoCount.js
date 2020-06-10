import { todoCountTemplate } from '../utils/Templates.js';

class TodoCount {
    constructor(count) {
        this.$todoCount = document.querySelector('.todo-count');
        this.render(count);
    }

    render(count) {
        this.$todoCount.innerHTML = todoCountTemplate(count);
    }
}

export default TodoCount;
