import { todos } from "./mock-data.js"
import { nanoid } from "../../lib/nanoid.js"

export const state = {
  input: "",
  filter: "all",
  todos: todos.map((todo) => ({ ...todo, isEditing: false })),
}

export const mutations = {
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
  insertTodo: ({ commit }, content) => {
    commit("insertTodo", {
      _id: nanoid(),
      content,
      isCompleted: false,
      isEditing: false,
    })
  },
  removeTodo: ({ commit }, id) => {
    commit("removeTodo", id)
  },
  updateTodo: ({ commit }, { id, content }) => {
    commit("updateTodo", { id, content })
  },
  toggleTodo: ({ commit }, id) => {
    commit("toggleTodo", id)
  },
  editingTodo: ({ commit }, { id, isEditing }) => {
    commit("editingTodo", { id, isEditing })
  },
}
