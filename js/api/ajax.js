import { TODO_API } from '../utils/constants.js';

const METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data
      })
    }
  },
  GET() {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  },
  PUT() {
    return {
      method: "PUT",
    }
  },
  DELETE() {
    return {
      method: "DELETE",
    }
  }
}


const api = (() => {
  const requestWithData = (uri, config) => fetch(uri, config).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("오류가 발생했습니다!");
  });

  const request = (uri, config) => fetch(uri, config).then(response => {
    if (!response.ok) {
      throw new Error("오류가 발생했습니다!");
    }
  });

  const todo = {
    create(data) {
      return request(TODO_API.URL + TODO_API.USER_NAME, METHOD.POST(data));
    },
    readAll() {
      return requestWithData(TODO_API.URL + TODO_API.USER_NAME, METHOD.GET());
    },
    // update(data) {
    //   return request(TODO_API.URL + TODO_API.USER_NAME + `/${data.id}`, METHOD.PUT(data));
    // },
    delete(id) {
      return request(TODO_API.URL + TODO_API.USER_NAME + `/${id}`, METHOD.DELETE());
    },
    toggle(id) {
      return request(TODO_API.URL + TODO_API.USER_NAME + `/${id}/toggle`, METHOD.PUT())
    }
  }

  return {
    todo,
  }
})();

export default api;