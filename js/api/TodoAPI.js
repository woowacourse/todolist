const METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    }
  },
  PUT() {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  DELETE() {
    return {
      method: 'DELETE'
    }
  }
}

const api = (() => {
  const request = (uri, config) => fetch(uri, config)
  const requestWithJsonData = (uri, config) => fetch(uri, config).then(data => data.json())

  const TODO_URI = "https://todo-api.roto.codes/woo";
  const todo = {
    getAll() {
      return requestWithJsonData(TODO_URI);
    },
    create(data) {
      return requestWithJsonData(TODO_URI, METHOD.POST(data));
    },
    toggle(id) {
      return request(TODO_URI + `/${id}/toggle`, METHOD.PUT())
    },
    delete(id) {
      return request(TODO_URI + `/${id}`, METHOD.DELETE());
    }
  }
  return {
    todo
  }
})()

export default api
