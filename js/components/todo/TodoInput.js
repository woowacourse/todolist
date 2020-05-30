import { KEY_TYPE } from "../../utils/constants.js"

export default ({ onInsert, onInput }) => {
  const $todoInput = document.querySelector("#new-todo-title")

  $todoInput.onkeyup = () => onInput($todoInput.value)

  $todoInput.onkeypress = ({ key }) => {
    if (key === KEY_TYPE.ENTER) {
      onInsert($todoInput.value)
      onInput("")
    }
  }

  return ({ input }) => ($todoInput.value = input)
}
