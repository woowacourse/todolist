const requestExpectingJsonReturn = (uri, config) => fetch(uri, config).then(data => data.json());
const request = (uri, config) => fetch(uri, config);

export const getAll = (username) => {
  return requestExpectingJsonReturn(`http://todo-api.roto.codes/${username}`);
}
