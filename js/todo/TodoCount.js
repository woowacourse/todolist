export default function TodoCount() {
  const $count = document.querySelector('.todo-count strong');

  this.setState = count => {
    this.render(count);
  }

  this.render = count => {
    $count.innerText = count;
  }
}