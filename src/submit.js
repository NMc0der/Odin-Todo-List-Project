import { DateTime } from "luxon";
import trashIcon from "./trash-can.png";
import editIcon from "./edit.png";

export default () => {};

const realAllTodos = ["hi"];
const allTodos = [];
const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector(".todos");
const theTime = document.querySelector(".time");

class Todo {
  constructor(description, date, time, priority) {
    this.description = description;
    this.date = date;
    this.time = time;
    this.priority = priority;
  }
}

// function addBookToLibrary() {
//   let title = document.querySelector("#newTitle").value;
//   let author = document.querySelector("#newAuthor").value;
//   let pages = document.querySelector("#numPages").value;
//   let read = document.querySelector("#hasRead").checked;
//   let newbook = new book(author, title, pages, read);
//   myLibrary.push(newbook);
//   showCards();
// }

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(todoForm);
  const data = Object.fromEntries(formData);

  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;
  const time = DateTime.fromFormat(theTime.value, "HH:mm").toFormat("h:mm a");
  const newTodo = new Todo(description, date, time, priority);
  realAllTodos.push(newTodo);
  showTodos(realAllTodos);
  // console.log(realAllTodos);

  getTime(data);
  attatchTodo(data);
  allTodos.push(data);
  showTodos(allTodos);
});

const getTime = (data) => {
  const formatedTime = DateTime.fromFormat(theTime.value, "HH:mm").toFormat(
    "h:mm a"
  );
  console.log(formatedTime);
  data.time = formatedTime;
};

const attatchTodo = (data) => {
  generateTodo(data);
};

const generateTodo = (data) => {
  const container = document.createElement("div");
  const leftSection = document.createElement("div");
  container.classList.add("todo");
  leftSection.classList.add("todo-left");
  const todo = document.createElement("span");
  const date = document.createElement("span");
  date.innerHTML = data.date;
  todo.innerHTML = data.todo;
  leftSection.append(todo);
  leftSection.append(date);
  container.append(leftSection);
  todos.append(container);

  const rightSection = document.createElement("div");
  const editBtn = document.createElement("img");
  const trashBtn = document.createElement("img");
  trashBtn.classList.add(`deleteBtn`);
  editBtn.classList.add(`editBtn`);
  editBtn.src = editIcon;
  trashBtn.src = trashIcon;
  container.append(rightSection);
  rightSection.append(editBtn);
  rightSection.append(trashBtn);
};

const deleteTodo = () => {
  document.querySelectorAll(".deleteBtn");
};

const showTodos = (todoArray, index) => {
  console.log(todoArray);
  for (let i = 0; i < todoArray.length; i += 1) {}
};
