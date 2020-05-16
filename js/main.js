import Todo from "./Todo.js"

function App() {
  const init = () => {
    new Todo();
  };

  return {
    init
  };
}

const app = new App();
app.init();
