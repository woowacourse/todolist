import {mockData} from "../utils/mockData.js";

const baseUrl = 'https://todo-api.roto.codes';

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
};

const api = (() => {
    const request = (url, config) => fetch(url, config).then(response => {
        if (!response.ok) {
            throw Error("error catch!")
        }
        return response
    }).catch(error => alert(error));
    const requestWithResponseBody = (url, config) => request(url, config).then(response => response.json());

    const todoList = {
        get(userName) {
            return requestWithResponseBody(`${baseUrl}/${userName}`)
        },
        create(userName, content) {
            return request(`${baseUrl}/${userName}`, method.post(content))
        },
        toggle(userName, itemId) {
            return request(`${baseUrl}/${userName}/${itemId}/toggle`, method.put())
        },
        edit(userName, data) {
            return mockData.edit(data)      //api 적용 x
        },
        delete(userName, itemId) {
            return request(`${baseUrl}/${userName}/${itemId}`, method.delete())
        }
    };
    return {
        todoList
    };
})();

export default api;