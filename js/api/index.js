const method = {
    putWithContent(content) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        };
    },
    put() {
        return {
            method: 'PUT'
        };
    },
    delete() {
        return {
            method: 'DELETE'
        };
    },
};

export const api = (() => {
    const url = 'https://todo-api.roto.codes/kueni';
    const request = (url, config) => fetch(url, config).then(response => {
        return new Promise((resolve, reject) => {
            response.status < 400 ? resolve(response) : reject(response);
        });
    });
    const requestWithJsonData = (url, config) => request(url, config).then(data => data.json());

    const todoList = {
        findAll() {
            return requestWithJsonData(url);
        },
        add(content) {
            return request(url, method.putWithContent(content));
        },
        delete(todoId) {
            return request(url + '/' + todoId, method.delete());
        },
        toggle(todoId) {
            return request(url + '/' + todoId, method.put());
        }
    };

    return {
        todoList
    };
})();
