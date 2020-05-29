const METHOD = {
	GET() {
		return {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
		};
	},
	POST(data) {
		return {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
			}),
		};
	},
	PUT() {
		return {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		};
	},
	DELETE() {
		return {
			method: 'DELETE',
		};
	},
};

const api = (() => {
	const todo = {
		getAll() {
			return fetch("https://todo-api.roto.codes/jamie9504", METHOD.GET());
		},
		create(data) {
			return fetch("https://todo-api.roto.codes/jamie9504",
				METHOD.POST(data));
		},
		changeToggleState(todoId) {
			return fetch(
				"https://todo-api.roto.codes/jamie9504/" + todoId + "/toggle",
				METHOD.PUT());
		},
		remove(todoId) {
			return fetch("https://todo-api.roto.codes/jamie9504/" + todoId,
				METHOD.DELETE())
		},
	};

	return {
		todo,
	};
})();

export default api;

