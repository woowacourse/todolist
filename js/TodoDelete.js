// item 삭제와 관련된 컴포넌트
export function TodoDelete() {
  this.handleDelete = (event, items, setState) => {
    const $target = event.target;
    if (!$target.classList.contains("destroy")) {
      return;
    }

    const $checkedItem = $target.closest("li");

    const deletedItems = items.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return;
      }
      return item;
    });

    const filtered = deletedItems.filter(function (el) {
      return el != null;
    });

    setState(filtered);
  };
}