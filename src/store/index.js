import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { FilterType, BASE_URL } from '../util/constants.js';

Vue.use(Vuex);

const api = axios.create({ baseURL: BASE_URL });

export default new Vuex.Store({
    state: {
        todos: [],
        filter: FilterType.ALL,
    },
    mutations: {
        async LOAD_TODOS(state) {
            try {
                const response = await api.get('/');
                state.todos = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async ADD_TODO(state, content) {
            try {
                await api.post('/', { content: content });
                const response = await api.get('/');
                state.todos = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async UPDATE_TODO(state, { id, content }) {
            console.log(content);
            state.todos
                .filter((todo) => todo._id === id)
                .map((todo) => {
                    todo.content = content;
                    return todo;
                });
        },
        async TOGGLE_TODO(state, id) {
            try {
                await api.put(`/${id}/toggle`);
                const response = await api.get('/');
                state.todos = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async DELETE_TODO(state, id) {
            try {
                await api.delete(`/${id}`);
                const response = await api.get('/');
                state.todos = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        CHANGE_FILTER(state, newFilter) {
            state.filter = newFilter;
        },
    },
    getters: {
        filteredTodos(state) {
            return state.filter.apply(state.todos);
        },
        filteredCount(state, getters) {
            return getters.filteredTodos.length;
        },
    },
});
