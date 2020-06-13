const todoCountTemplate = (count) => `
<span class="todo-count">총 <strong>${count}</strong> 개</span>
`;

export default class TodoCount {
    constructor(count) {
        this.$todoCount = document.querySelector('.todo-count');
        this.render(count);
    }

    render(count) {
        this.$todoCount.innerHTML = todoCountTemplate(count);
    }
}
