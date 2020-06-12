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
  const JsonAfterResponse = (uri, config) => fetch(uri, config).then(data => data.json());

  const todoItem = {
    create(todoItem) {
      return JsonAfterResponse(
        "https://todo-api.roto.codes/rutgo",
        METHOD.POST(todoItem)
      );
    },
    get() {
      return JsonAfterResponse(
        "https://todo-api.roto.codes/rutgo",
        METHOD.GET()
      );
    }
  };
  return {
    todoItem,
  };
})();

export default api;
