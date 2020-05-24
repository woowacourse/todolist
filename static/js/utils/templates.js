export const newTodoItem = item => `
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label"></label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${item}>`