const BASE_URL = "https://todo-api.roto.codes";

const METHOD = {
    GET() {
        return {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        };
    },
    PUT(data) {
        return {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                data
            )
        };
    },
    DELETE() {
        return {
            method: "DELETE"
        };
    },
    POST(data) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: data
            })
        };
    }
};

const api = (() => {
    const request = (uri, config) => fetch(BASE_URL+uri, config)
        .then(response => response.json());

    const todos = {
        get() {
            return request(`/moonyoungchae`, METHOD.GET());
        },
        create(data) {
            return request(`/moonyoungchae`, METHOD.POST(data));
        },
        update(data, id) {
            return request(`/moonyoungchae`, METHOD.PUT(data));
        },
        delete(id) {
            return request(`/moonyoungchae`, METHOD.DELETE());
        }
    };

    return {
        todos
    };
})();

export default api;