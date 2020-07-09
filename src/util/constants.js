export const FilterType = {
    ALL: {
        className: 'all',
        href: '#/',
        content: '전체보기',
        apply: function(todos) {
            return todos;
        },
    },
    ACTIVE: {
        className: 'active',
        href: '#/active',
        content: '해야할 일',
        apply: function(todos) {
            return todos.filter((todo) => !todo.isCompleted);
        },
    },
    COMPLETED: {
        className: 'completed',
        href: '#/completed',
        content: '완료한 일',
        apply: function(todos) {
            return todos.filter((todo) => todo.isCompleted);
        },
    },
};

export const BASE_URL = 'https://todo-api.roto.codes/ks-kim';
