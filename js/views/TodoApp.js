import {
  TodoInput,
  TodoList,
  TodoCount,
  TodoFilter,
} from "../components/todo/index.js"

export default ({ state, commit, dispatch }) => {
  const todoInput = TodoInput({
    onInsert: (content) => dispatch("insertTodo", content),
    onInput: (value) => commit("setInput", value),
  })

  const todoList = TodoList({
    onToggle: (id) => dispatch("toggleTodo", id),
    onRemove: (id) => dispatch("removeTodo", id),
    onUpdate: (id, content) => dispatch("updateTodo", { id, content }),
    onEditing: (id, isEditing) => commit("editingTodo", { id, isEditing }),
  })

  const todoCount = TodoCount()

  const todoFilter = TodoFilter({
    onFilter: (filter) => commit("setFilter", filter),
  })

  const render = ({ input, todos, filter }) => {
    const filteredTodos = todos.filter(
      (todo) =>
        filter === "all" ||
        (filter === "completed" && todo.isCompleted) ||
        (filter === "active" && !todo.isCompleted)
    )

    todoInput({ input })
    todoList({ todos: filteredTodos })
    todoCount({ count: filteredTodos.length })
    todoFilter({ filter })
  }

  render(state)

  return render
}
