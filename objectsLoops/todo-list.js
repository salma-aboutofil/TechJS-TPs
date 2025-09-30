
const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach((e, index) => {
    todoListHTML += `
      <div>
        <p>${e.name}</p>
        <p>${e.dueDate}</p>
        <button class="delete-todo-button" data-index="${index}">Delete</button>
      </div>
    `;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.delete-todo-button')
    .forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  let objet = {
    name: name,
    dueDate: dueDate
  };
  todoList.push(objet);

  inputElement.value = '';

  renderTodoList();
}
