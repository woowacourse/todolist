export class TodoItem {
  constructor(id, title, isFinished) {
    this.id = id;
    this.title = title;
    this.isFinished = isFinished;
  }

  toggle = () => {
    this.isFinished = !this.isFinished;
  }

  changeTitle = title => {
    this.title = title;
  }
}