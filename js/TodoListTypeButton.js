import { EVENT_TYPE } from "./utils/constants.js";

export class TodoListTypeButton {
  
    constructor({ onShowAll, onShowActive, onShowCompleted }) {
      const classNameForFocusing = "selected";
  
      const $showAllButton = document.querySelector(".all");
      const $showActiveButton = document.querySelector(".active");
      const $showCompletedButton = document.querySelector(".completed");
  
      $showAllButton.addEventListener(EVENT_TYPE.CLICK, onShowAll);
      $showActiveButton.addEventListener(EVENT_TYPE.CLICK, onShowActive);
      $showCompletedButton.addEventListener(EVENT_TYPE.CLICK, onShowCompleted);
  
      this.focusOnShowAllButton = () => {
        if (!$showAllButton.classList.contains(classNameForFocusing)) {
          $showAllButton.classList.add(classNameForFocusing);
        }
        $showActiveButton.classList.remove(classNameForFocusing);
        $showCompletedButton.classList.remove(classNameForFocusing);
      }
  
      this.focusOnShowActiveButton = () => {
        if (!$showActiveButton.classList.contains(classNameForFocusing)) {
          $showActiveButton.classList.add(classNameForFocusing);
        }
        $showAllButton.classList.remove(classNameForFocusing);
        $showCompletedButton.classList.remove(classNameForFocusing);
      }
  
      this.focusOnShowCompletedButton = () => {
        if (!$showCompletedButton.classList.contains(classNameForFocusing)) {
          $showCompletedButton.classList.add(classNameForFocusing);
        }
        $showAllButton.classList.remove(classNameForFocusing);
        $showActiveButton.classList.remove(classNameForFocusing);
      }
    }
  }