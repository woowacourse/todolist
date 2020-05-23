// complete 여부를 표시하는 checkbox 컴포넌트
export function TodoCheckBox() {
  this.handleCheckBox = (event, items, setState) => {
    const $target = event.target;
    if (!$target.classList.contains("toggle")) {
      return;
    }
    const $checkedItem = $target.closest("li");
    const updatedItems = items.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return item.completedToggle();
      }
      return item;
    });

    setState(updatedItems);
  };
}
