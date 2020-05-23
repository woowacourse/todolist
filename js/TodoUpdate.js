// item 내용 수정에 관한 컴포넌트
export function TodoUpdate() {
  this.handleUpdate = (event, items, setState) => {
    const $target = event.target;
    if (
      !$target.classList.contains("edit") ||
      (event.key !== "Enter" && event.key !== "Escape") ||
      $target.value.trim() === ""
    ) {
      return;
    }

    const $checkedItem = $target.closest("li");
    const updatingItems = items.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        if (event.key === "Escape") {
          return item.editingItem();
        }
        return item.updateItem($target.value);
      }
      return item;
    });

    setState(updatingItems);
  };
}