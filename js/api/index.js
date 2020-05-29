import {mockData} from "../utils/mockData.js"

const api = (() => {
    const todoList = {
        get() {
           return mockData.getAll();
        },
        create(content) {
            return mockData.createTodo(content)
        },
        toggle(id) {
            return mockData.toggleItemBy(id)
        },
        edit(data) {
            return mockData.edit(data)
        },
        delete(id) {
            return mockData.deleteById(id)
        }
    }
    return {
        todoList
    }
})()
export default api;