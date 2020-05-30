import * as todoApi from "../../api/todo.js"
import { FILTER_TYPE } from "../../utils/constants.js"

export const state = {
  input: "",
  filter: FILTER_TYPE.ALL,
  todos: [],
}

export const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos
  },
  insertTodo: (state, todo) => {
    state.todos = [...state.todos, todo]
  },
  updateTodo: (state, { id, content }) => {
    state.todos = state.todos.map((todo) =>
      todo._id != id ? todo : { ...todo, content }
    )
  },
  toggleTodo: (state, id) => {
    state.todos = state.todos.map((todo) =>
      todo._id != id ? todo : { ...todo, isCompleted: !todo.isCompleted }
    )
  },
  removeTodo: (state, id) => {
    state.todos = state.todos.filter((todo) => todo._id != id)
  },
  editingTodo: (state, { id, isEditing }) => {
    state.todos = state.todos.map((todo) =>
      todo._id != id ? todo : { ...todo, isEditing }
    )
  },
  setInput: (state, input) => {
    state.input = input
  },
  setFilter: (state, filter) => {
    state.filter = filter
  },
}

export const actions = {
  loadTodos: async ({ commit }) => {
    const todos = await todoApi.getTodos()
    commit("setTodos", todos)
  },
  insertTodo: async ({ dispatch }, content) => {
    await todoApi.addTodo(content)
    dispatch("loadTodos")
  },
  removeTodo: async ({ commit }, id) => {
    todoApi.removeTodo(id)
    commit("removeTodo", id)
  },
  updateTodo: async ({ commit, dispatch }, { id, content }) => {
    dispatch("removeTodo", id)
    dispatch("insertTodo", content)
  },
  toggleTodo: async ({ commit }, id) => {
    await todoApi.toggleTodo(id)
    commit("toggleTodo", id)
  },
}
