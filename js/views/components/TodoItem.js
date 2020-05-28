import { STATE } from '../../utils/constants.js';
import { getUUID } from '../../utils/uuid.js';

export class TodoItem {
  constructor(content) {
    this.id = getUUID();
    this.content = content;
    this.status = STATE.ACTIVE;
  }
}