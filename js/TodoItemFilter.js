export class TodoItemFilter {

  constructor() {
    this.filterCompleted = items => {
      return items.filter(item => item.completed);
    }

    this.filterActive = items => {
      return items.filter(item => !item.completed);
    }
  }
}
