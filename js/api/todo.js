const API_URL = "https://todo-api.roto.codes/lalize"

export const getTodos = () => fetch(API_URL).then((response) => response.json())

export const addTodo = (content) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  })

export const removeTodo = (id) =>
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

export const toggleTodo = (id) =>
  fetch(`${API_URL}/${id}/toggle`, {
    method: "PUT",
  })
