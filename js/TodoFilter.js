// Item의 상태에 따라 조회하여 보여주는 컴포넌트
export function TodoFilter() {
  this.applyFilter = (event, todoItems, render) => {
    const $target = event.target;

    const $allButton = document.querySelector(".all");
    const $activeButton = document.querySelector(".active");
    const $completedButton = document.querySelector(".completed");

    $allButton.classList.remove("selected");
    $activeButton.classList.remove("selected");
    $completedButton.classList.remove("selected");

    if ($target.classList.contains("all")) {
      $allButton.classList.add("selected");
      render(todoItems);
    }

    if ($target.classList.contains("active")) {
      const filtered = todoItems.filter(function (item) {
        return !item.isCompleted;
      });
      $activeButton.classList.add("selected");
      render(filtered);
    }

    if ($target.classList.contains("completed")) {
      const filtered = todoItems.filter(function (item) {
        return item.isCompleted;
      });
      $completedButton.classList.add("selected");
      render(filtered);
    }
  };
}
