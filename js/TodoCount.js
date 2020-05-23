// item의 개수를 표현하는 컴포넌트
export function TodoCount() {
  const $count = document.querySelector(".todo-count");

  this.showCount = (items) => {
    $count.innerHTML = `총 <strong>${items.length}</strong> 개`;
  };
}
