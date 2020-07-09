<template>
    <input
        id="new-todo-title"
        class="new-todo"
        placeholder="할일을 추가해주세요"
        autofocus
        @keyup.enter="addTodo"
        v-model="content"
    />
</template>

<script>
export default {
    data() {
        return {
            content: '',
        };
    },
    methods: {
        addTodo() {
            const newContent = this.content;
            if (newContent.trim().length === 0) {
                alert('입력값이 올바르지 않습니다.');
                return;
            }
            this.content = '';
            return this.$store.commit('ADD_TODO', newContent);
        },
    },
};
</script>
