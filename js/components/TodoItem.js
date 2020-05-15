export default function template({ id, title, status }) {
  return `<li data-id="${id}" ${status ? `class=${status}` : ""}>
  <div class="view">
    <input class="toggle" type="checkbox" ${status === "completed" ? "checked" : ""}>
    <label class="label">${title}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${title}">
</li>`;
}
