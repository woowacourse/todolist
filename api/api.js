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
  DELETE() {
    return {
      method: 'DELETE'
    }
  },
  PUT() {
    return {
      method: 'PUT'
    }
  }
}

const requestExpectingJsonReturn = (uri, config) => fetch(uri, config).then(data => data.json());
const request = (uri, config) => fetch(uri, config);

export const todoAPI = {
  getAll(username) {
    return requestExpectingJsonReturn(`http://todo-api.roto.codes/${username}`);
  },
  create(username, data) {
    return request(`https://todo-api.roto.codes/${username}`, METHOD.POST(data));
  },
  delete(username, id) {
    return request(`http://todo-api.roto.codes/${username}/${id}`, METHOD.DELETE());
  },
  complete(username, id) {
    return request(`http://todo-api.roto.codes/${username}/${id}/toggle`, METHOD.PUT());
  }
}
