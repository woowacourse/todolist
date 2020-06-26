import {EVENT_TYPE, FILTERS, KEY_KIND, TODO_CLASS} from "../utils/constants.js";
import {addFirstClass} from "../utils/classSetting.js";
import {todoItemTemplate} from "../utils/Templates.js";
import api from "../api/index.js";

function Todo() {

	const $newTodoInput = document.querySelector("#new-todo-title");
	const $todoMain = document.querySelector(".main");
	const $todoList = document.querySelector("#todo-list");
	const $filters = document.querySelectorAll(".count-container .filters a");

	const newTodoInputClickEvent = event => {
		event.preventDefault();
		event.target.select();
	};

	const newTodoKeydownEvent = event => {
		if (event.key === KEY_KIND.ENTER) {
			createTodo();
		}

		function createTodo() {
			event.preventDefault();
			const data = {
				content: event.target.value
			};
			api.todo.create(data).then(res => {
				if (!res.ok) {
					throw Error("TODO 등록에 실패하였습니다.");
				}
				api.todo.getAll().then(res => {
						if (!res.ok) {
							throw Error("TODO 조회에 실패하였습니다.");
						}
						return res.json();
					}
				).then(res => {
					updateCreatedTodo();

					function updateCreatedTodo() {
						const $todos = document.querySelectorAll(
							"#todo-list li");
						const $todoIds = Array.from($todos).map(
							todo => todo.dataset.todoId);
						const created = res.filter(todo => {
							return !$todoIds.includes(todo._id);
						});
						const createdFilter = document.querySelector(
							"." + FILTERS.SELECTED).classList.contains(
							FILTERS.COMPLETE);

						created.forEach(res => {
							if (createdFilter) {
								api.todo.changeToggleState(res._id);
								res.isCompleted = true;
							}
							$todoList.innerHTML = $todoList.innerHTML
								+ todoItemTemplate(res);
						});
						setCounts();
					}
				});
			})
			.catch(err => alert(err));
			event.target.value = "";
		}
	};

	const todoListClickEvent = event => {
		event.preventDefault();
		if (event.target.className === "toggle") {
			toggleClick();
		} else if (event.target.className === "destroy") {
			destroyClick();
		}

		function toggleClick() {
			const toggleList = event.target.parentElement.parentElement;
			api.todo.changeToggleState(toggleList.dataset.todoId).then(res => {
				if (!res.ok) {
					throw Error("토글 상태 변경에 실패했습니다.");
				}
				if (toggleList.className.startsWith(TODO_CLASS.COMPLETE)) {
					toggleList.classList.remove(TODO_CLASS.COMPLETE);
					return;
				}
				addFirstClass(toggleList, TODO_CLASS.COMPLETE);
			}).then(() => changeDisplayByFilter()).catch(err => alert(err));
		}

		function destroyClick() {
			const removeList = event.target.parentElement.parentElement;
			api.todo.remove(removeList.dataset.todoId).then(res => {
				if (!res.ok) {
					throw Error("삭제에 실패하였습니다.");
				}
				removeList.parentElement.removeChild(removeList);
				changeDisplayByFilter();
			}).catch(err => alert(err));
		}
	};

	const todoListKeydownEvent = event => {
		if (event.key === KEY_KIND.ENTER) {
			event.preventDefault();
			saveData();
			changeNotEdit();
		} else if (event.key === KEY_KIND.ESC) {
			event.preventDefault();
			rollBackData();
			changeNotEdit();
		}

		// 준코치님 Update API가 없어요!
		function saveData() {
			document.querySelector(".editing").className;
			event.target.parentElement.classList.remove(TODO_CLASS.EDIT);

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
			event.target.parentElement.classList.remove(TODO_CLASS.EDIT);
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
					edit.classList.remove(TODO_CLASS.EDIT);
				});
			}
		}
	};

	const todoListDoubleClickEvent = event => {
		event.preventDefault();

		const isTargetCheckbox = !event.target.type;
		if (isTargetCheckbox) {
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
			} else if (selectedFilter.classList.contains(FILTERS.ACTIVE)) {
				displayToDoList = noCompletes;
				noDisplayToDoList = completes;
			} else if (selectedFilter.classList.contains(FILTERS.COMPLETE)) {
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

	const loadToDosFromApi = () => {
		api.todo.getAll().then(res => {
			if (!res.ok) {
				throw Error("예기치 않은 오류가 발생했습니다.");
			}
			return res.json();
		}).then(todos =>
			todos.forEach(todo => {
				$todoList.innerHTML = $todoList.innerHTML
					+ todoItemTemplate(todo);
				setCounts();
			})).catch(err => alert(err));
	};

	this.init = () => {
		eventSetting();
		loadToDosFromApi();
	}
}

const index = new Todo();
index.init();