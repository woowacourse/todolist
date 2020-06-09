function Api() {
  const METHOD = {
    POST(data) {
      return {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      }
    },
    PUT(data) {
      return {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      }
    },
    DELETE() {
      return {
        method: "DELETE"
      }
    }
  };

  const request = (url, info) => fetch(url, info).then(data => data.json());
  const requestWithoutBody = (url, info) => fetch(url, info);

  this.app = {
    get() {
      return request("https://todo-api.roto.codes/minuyim");
    },
    create(data) {
      return requestWithoutBody("https://todo-api.roto.codes/minuyim", METHOD.POST(data))
    },
    delete(id) {
      return requestWithoutBody("https://todo-api.roto.codes/minuyim/" + id , METHOD.DELETE())
    },
    toggle(id) {
      return requestWithoutBody("https://todo-api.roto.codes/minuyim/" + id +"/toggle", METHOD.PUT())
    }
  }
}

const api = new Api();
export default api;