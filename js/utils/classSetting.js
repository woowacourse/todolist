export const addFirstClass = (element, className) => {
	if (element.className !== "") {
		element.className = className + " " + element.className;
		return;
	}
	element.className = className;
};

export const removeClass = (element, className) => {
	let check = new RegExp("(\\s|^)" + className + "(\\s|$)");
	element.className = element.className.replace(check, " ").trim();
};
