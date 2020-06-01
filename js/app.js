import store from "./store/index.js"
import TodoApp from "./views/TodoApp.js"

const todoApp = TodoApp(store)
store.on("stateChange", todoApp)
store.dispatch("loadTodos")
