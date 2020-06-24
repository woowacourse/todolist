const BASE_URI = "https://todo-api.roto.codes/";

const METHOD = {
  GET() {
    return {
      method: "GET",
    };
  },
  POST(todoItem) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    };
  },
  PUT() {
    return {
      method: "PUT",
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const api = (() => {
  const jsonAfterResponse = (uri, config) =>
    fetch(uri, config).then((data) => data.json());
  const response = (uri, config) => fetch(uri, config);

  const todoItem = {
    create(todoItem) {
      return jsonAfterResponse(`${BASE_URI}rutgo`, METHOD.POST(todoItem));
    },
    get() {
      return jsonAfterResponse(`${BASE_URI}rutgo`, METHOD.GET());
    },
    delete(id) {
      return response(`${BASE_URI}rutgo/${id}`, METHOD.DELETE());
    },
    toggle(id) {
      return response(`${BASE_URI}rutgo/${id}/toggle`, METHOD.PUT());
    },
  };
  return {
    todoItem,
  };
})();

export default api;
