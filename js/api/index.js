import {mockData} from "../utils/mockData.js"

const method = {
    post(data) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    content: data
                }
            )
        }
    },
    put() {
        return {
            method: 'PUT'
        }
    },
    delete() {
        return {
            method: 'DELETE'
        }
    }
}

const api = (() => {
    const request = (url, config) => fetch(url, config).then(response => {
        if (!response.ok) {
            throw Error("error catch!")
        }
        return response
    }).catch(error => alert(error))
    const requestWithResponseBody = (url, config) => request(url, config).then(response => response.json())

    const todoList = {
        get(userName) {
            return requestWithResponseBody(`https://todo-api.roto.codes/${userName}`)
        },
        create(userName, content) {
            return request(`https://todo-api.roto.codes/${userName}`, method.post(content))
        },
        toggle(userName, itemId) {
            return request(`https://todo-api.roto.codes/${userName}/${itemId}/toggle`, method.put())
        },
        edit(userName, data) {
            return mockData.edit(data)      //api 적용 x
        },
        delete(userName, itemId) {
            return request(`https://todo-api.roto.codes/${userName}/${itemId}`, method.delete())
        }
    }
    return {
        todoList
    }
})()

export default api