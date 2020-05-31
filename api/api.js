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
  }
}

const requestExpectingJsonReturn = (uri, config) => fetch(uri, config).then(data => data.json());
const request = (uri, config) => fetch(uri, config);

export const getAll = (username) => {
  return requestExpectingJsonReturn(`http://todo-api.roto.codes/${username}`);
}

export const create = (username, data) => {
  return request(`https://todo-api.roto.codes/${username}`, METHOD.POST(data));
}
