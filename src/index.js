import "./app.css";
import modal from "./modal";
import submit from "./submit";
import tabs from "./tabs";
// const addTodoBtn = document.querySelector(".todo-add");

const todoForm = document.querySelector(".todo-form");
const theTime = document.querySelector(".time");

class Todo {
  constructor(description, date, time, priority, createdDate) {
    this.description = description;
    this.date = date;
    this.time = time;
    this.priority = priority;
    this.createdDate = createdDate;
  }
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(todoForm);
  // const data = Object.fromEntries(formData);

  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const formatedDate = format(parseISO(date), "MM/dd/yyyy");
  console.log(formatedDate);
  const priority = document.querySelector("#priority").value;
  const time = DateTime.fromFormat(theTime.value, "HH:mm").toFormat("h:mm a");

  const newTodo = new Todo(
    description,
    formatedDate,
    time,
    priority,
    getCurrentTime()
  );

  allTodos.push(newTodo);
  showTodos(allTodos);
  console.log(allTodos);
  generateTodos(allTodos);
  const modal = document.querySelector("#todo-form-modal");
  closeForm(modal);
  // getTime(data);
  // attatchTodo(data);
  // allTodos.push(data);
  // showTodos(allTodos);
});
