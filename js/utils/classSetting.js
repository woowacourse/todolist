export const addFirstClass = (element, className) => {
	if (element.className !== "") {
		element.className = className + " " + element.className;
		return;
	}
	element.className = className;
};
