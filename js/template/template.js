export const itemTemplate = (item) => `
      <li class="${item.state}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${item.contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}">
      </li>`