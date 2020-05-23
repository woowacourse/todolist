// Item 내용의 수정 후 저장에 관한 컴포넌트
export function TodoEdit() {
  this.handleEdit = (event, items, setState) => {
    const $target = event.target;
    if (!$target.classList.contains("label")) {
      return;
    }

    const $checkedItem = $target.closest("li");
    const editingItems = items.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return item.editingItem();
      }
      return item;
    });

    setState(editingItems);
  };
}