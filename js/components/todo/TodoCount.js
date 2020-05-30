export default () => {
  const $todoCount = document.querySelector("#todo-count")

  return ({ count }) =>
    ($todoCount.innerHTML = `총 <strong>${count}</strong> 개`)
}
