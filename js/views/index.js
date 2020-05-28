import {EVENT_TYPE, FILTERS, KEY_CODE, TODO_CLASS} from "../utils/constants.js";
import {addFirstClass, removeClass} from "../utils/classSetting.js";
import {todoItemTemplate} from "../utils/Templates.js";

function Index() {

	const $newTodoInput = document.querySelector("#new-todo-title");
	const $todoMain = document.querySelector(".main");
	const $todoList = document.querySelector("#todo-list");
	const $filters = document.querySelectorAll(".count-container .filters a");

	const newTodoInputClickEvent = event => {
		event.preventDefault();
		event.target.select();
	};

	const newTodoKeydownEvent = event => {
		if (event.keyCode === KEY_CODE.ENTER) {
			event.preventDefault();
			$todoList.innerHTML = $todoList.innerHTML + todoItemTemplate(
				event.target.value);
			event.target.value = "";
		}
	};

	const todoListClickEvent = event => {
		event.preventDefault();
		if (event.target.className === "toggle") {
			toggleClick();
		}
		if (event.target.className === "destroy") {
			destroyClick();
		}
		changeDisplayByFilter();

		function toggleClick() {
			const toggleList = event.target.parentElement.parentElement;
			if (toggleList.className.startsWith(TODO_CLASS.COMPLETE)) {
				removeClass(toggleList, TODO_CLASS.COMPLETE);
				return;
			}
			addFirstClass(toggleList, TODO_CLASS.COMPLETE);
		}

		function destroyClick() {
			const removeList = event.target.parentElement.parentElement;
			removeList.parentElement.removeChild(removeList);
		}
	};

	const todoListKeydownEvent = event => {
		if (event.keyCode === KEY_CODE.ENTER) {
			event.preventDefault();
			saveData();
			changeNotEdit();
		}

		if (event.keyCode === KEY_CODE.ESC) {
			event.preventDefault();
			rollBackData();
			changeNotEdit();
		}

		function saveData() {
			document.querySelector(".editing").className;
			removeClass(event.target.parentElement, TODO_CLASS.EDIT);

			event.target.parentElement.querySelector(
				".view > .label").innerText = event.target.value;
		}

		function rollBackData() {
			const defaultValue = event.target.parentElement.querySelector(
				".view > .label").innerText;
			event.target.value = "";
			event.target.value = defaultValue;
		}

		function changeNotEdit() {
			removeClass(event.target.parentElement, TODO_CLASS.EDIT);
		}
	};

	const documentClickEvent = event => {
		event.preventDefault();
		changeExitStateToInput();

		function changeExitStateToInput() {
			const edits = document.querySelectorAll("." + TODO_CLASS.EDIT);
			const parents = event.target.parentElement;
			let isTargetEdit = false;
			if (parents) {
				isTargetEdit = parents.className.startsWith(TODO_CLASS.EDIT);
			}
			if (edits.length > 0 && !isTargetEdit) {
				edits.forEach(edit => {
					const defaultValue = edit.querySelector(
						".view > .label").innerText;
					const editInput = edit.querySelector(".edit");
					editInput.value = "";
					editInput.value = defaultValue;
					removeClass(edit, TODO_CLASS.EDIT)
				});
			}
		}
	};

	const todoListDoubleClickEvent = event => {
		event.preventDefault();

		const isTargetCheckbox = !event.target.type;
		if (isTargetCheckbox) {
			changeEditStateToInput();
		}

		function changeEditStateToInput() {
			let parent = event.target.parentElement.parentElement;
			if (!parent.className.startsWith(TODO_CLASS.EDIT)) {
				addFirstClass(parent, TODO_CLASS.EDIT);
			}
		}
	};

	const filtersClickEvent = event => {
		onOffChanger();
		changeDisplayByFilter();

		function onOffChanger() {
			$filters.forEach(
				filter => filter.classList.remove(FILTERS.SELECTED));
			event.target.classList.add(FILTERS.SELECTED);
		}
	};

	const changeDisplayByFilter = () => {
		let selectedFilter = document.querySelector(
			".count-container ." + FILTERS.SELECTED);
		let toDoList = $todoMain.querySelectorAll("li");
		let displayToDoList = null;
		let noDisplayToDoList = null;

		displayListManager();
		displaySetting();
		setCounts();

		function displayListManager() {
			const toDos = Array.from(toDoList);
			const completes = toDos.filter(
				todo => todo.classList.contains(TODO_CLASS.COMPLETE));
			const noCompletes = toDos.filter(
				todo => !todo.classList.contains(TODO_CLASS.COMPLETE));
			if (selectedFilter.classList.contains(FILTERS.ALL)) {
				displayToDoList = toDos;
			}
			if (selectedFilter.classList.contains(FILTERS.ACTIVE)) {
				displayToDoList = noCompletes;
				noDisplayToDoList = completes;
			}
			if (selectedFilter.classList.contains(FILTERS.COMPLETE)) {
				displayToDoList = completes;
				noDisplayToDoList = noCompletes;
			}
		}

		function displaySetting() {
			displayToDoList.forEach(displayToDo => {
				displayToDo.style.display = "block";
			});
			if (noDisplayToDoList) {
				noDisplayToDoList.forEach(noDisplayToDo => {
					noDisplayToDo.style.display = "none";
				});
			}
		}
	};

	const setCounts = () => {
		const $allToDoList = document.querySelectorAll(".main li");
		const blockCount = Array.from($allToDoList).filter(
			todo => todo.style.display === "none").length;
		const todoCount = $allToDoList.length - blockCount;
		const $todoCounter = document.querySelector(".todo-count strong");
		$todoCounter.innerText = todoCount;
	};

	const eventSetting = () => {
		document.addEventListener(EVENT_TYPE.CLICK, documentClickEvent);
		$newTodoInput.addEventListener(EVENT_TYPE.CLICK,
			newTodoInputClickEvent);
		$newTodoInput.addEventListener(EVENT_TYPE.KEYDOWN, newTodoKeydownEvent);
		$todoMain.addEventListener(EVENT_TYPE.CLICK, todoListClickEvent);
		$todoMain.addEventListener(EVENT_TYPE.DOUBLE_CLICK,
			todoListDoubleClickEvent);
		$todoMain.addEventListener(EVENT_TYPE.KEYDOWN, todoListKeydownEvent);
		$filters.forEach(filter =>
			filter.addEventListener(EVENT_TYPE.CLICK, filtersClickEvent));
	};

	this.init = () => {
		eventSetting();
		setCounts();
	}
}

const index = new Index();
index.init();