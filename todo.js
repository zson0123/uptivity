const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanTodos = todos.filter((todo) => todo.id !== parseInt(li.id));
  todos = cleanTodos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  li.className = "todo";
  const delBtn = document.createElement("button");
  delBtn.className = "todo_button";
  delBtn.innerText = "X";
  const span = document.createElement("span");
  const newId = todos.length + 1;
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => paintTodo(todo.text));
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
