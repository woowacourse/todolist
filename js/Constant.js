export const ALERT_MESSAGE = {
  CONFIRM: "정말 삭제하시겠습니까?"
};

export const FILTER = {
  ACTIVE: {
    name: "active",
    filtering: item => !item.isCompleted
  },
  COMPLETED: {
    name: "completed",
    filtering: item => item.isCompleted
  },
  ALL: {
    name: "all",
    filtering: item => true
  }
};

export const KEY_TYPE = {
  ENTER: "Enter"
};

export const EVENT_TYPE = {
  CLICK: "click",
  KEYDOWN: "keydown"
};