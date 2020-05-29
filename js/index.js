const METHOD = {
    GET() {
        return {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        };
    },
    PUT() {
        return {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        };
    },
    POST(data) {
        return {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data
            })
        };
    },

    DELETE() {
        return {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        };
    }
};

const api = (() => {

    const requestWithJsonData = (uri, config) => fetch(uri, config).then(data => data.json());

    const todo = {
        get() {
            return requestWithJsonData('https://todo-api.roto.codes/orange', METHOD.GET());
        },
        create(data) {
            return requestWithJsonData('https://todo-api.roto.codes/orange', METHOD.POST(data));
        },
        delete(id) {
            return requestWithJsonData('https://todo-api.roto.codes/orange/' + id, METHOD.DELETE());
        },
        complete(id) {
            return requestWithJsonData('https://todo-api.roto.codes/orange/' + id + "/toggle", METHOD.PUT());
        }
    };

    return {
        todo,
    };
})();

export default api;
