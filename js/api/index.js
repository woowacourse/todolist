const METHOD = {
  GET() {
    return {
      method: "GET",
    };
  },
  POST(todoItem) {
    return {
      method: "post",
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
  const jsonAfterResponse = (uri, config) => fetch(uri, config).then(data => data.json());
  const response = (uri, config) => fetch(uri, config);

  const todoItem = {
    create(todoItem) {
      return jsonAfterResponse(
        "https://todo-api.roto.codes/rutgo",
        METHOD.POST(todoItem)
      );
    },
    get() {
      return jsonAfterResponse(
        "https://todo-api.roto.codes/rutgo",
        METHOD.GET()
      );
    },
    delete(id) {
      return response(
        "https://todo-api.roto.codes/rutgo/" + id,
        METHOD.DELETE()
      );
    }
  };
  return {
    todoItem,
  };
})();

export default api;
