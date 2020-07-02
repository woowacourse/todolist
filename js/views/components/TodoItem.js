import { STATE } from '../../utils/constants.js';

export class TodoItem {
  constructor(data) {
    this._id = data._id;
    this.content = data.content;
    this.isCompleted = data.isCompleted;
  }

  toggle(id) {
    if (this._id !== id) {
      return;
    }
    if (this.isCompleted === STATE.COMPLETE) {
      this.isCompleted = STATE.ACTIVE;
    } else {
      this.isCompleted = STATE.COMPLETE;
    }
  }

  isNotSame(id) {
    return this._id !== id;
  }

  // update(data) {
  //   if (this._id !== data.id) {
  //     return;
  //   }
  //   this.content = data.content;
  // }
}