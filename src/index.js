import "./app.css";
import { DateTime } from "luxon";
import { parseISO, format } from "date-fns";
import modal, { closeForm } from "./modal";
import submit, {
  generateTodos,
  allTodos,
  getSelectedArray,
  allProjects,
  generateProjects,
} from "./submit";
// import tabs, { getSelectedArray } from "./tabs";
// const addTodoBtn = document.querySelector(".todo-add");\\
let selected = getSelectedArray();

// const mediaQuerySmall = window.matchMedia("(max-width: 405px");

// const handleSmallMediaChange = (e) => {
//   if (e.matches) {
//     console.log("it matched again!");
//   }
// };

// mediaQuerySmall.addListener(handleSmallMediaChange);
// handleSmallMediaChange(mediaQuerySmall);

// const myObjDesearialized = JSON.parse(localStorage.getItem("mainArray"));

// myObjDesearialized.forEach((obj) => {
//   allTodos.push(obj);
// });

// generateTodos(selected);

// const myObjSeralized = JSON.stringify(selected);
// localStorage.setItem("mainArray", myObjSeralized);

generateTodos(typeof selected === "function" ? selected() : selected);
generateProjects(allProjects);

const todoForm = document.querySelector(".todo-form");
const theTime = document.querySelector(".time");
// const editModal = document.querySelector("#edit-modal");

class Todo {
  constructor(description, date, time, priority, createdDate) {
    this.description = description;
    this.date = date;
    this.time = time;
    this.priority = priority;
    this.createdDate = createdDate;
  }
}

const setError = (el, msg) => {
  console.log("there is an error!!!");
  // el.classList.add("form-input--error");
  el.required = true;
};

theTime.addEventListener("click", () => {});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(todoForm);
  // const data = Object.fromEntries(formData);
  // const addTodoBtn = document.querySelector(".todo-add");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");

  const priority = document.querySelector("#priority").value;

  if (description.value === "") return setError(description);
  if (!date.value) return setError(date);
  if (!theTime.value) return setError(theTime);

  const time = DateTime.fromFormat(theTime.value, "HH:mm").toFormat("h:mm a");
  const formatedDate = format(parseISO(date.value), "MM/dd/yyyy");
  console.log(formatedDate);
  const newTodo = new Todo(
    description.value,
    formatedDate,
    time,
    priority,
    getCurrentTime()
  );

  allTodos.push(newTodo);
  // const myObjDesearialized = JSON.parse(localStorage.getItem("mainArray"));

  const myObjSeralized = JSON.stringify(allTodos);

  localStorage.setItem("mainArray", myObjSeralized);

  console.log(myObjSeralized);
  // console.log(myObjDesearialized);
  console.log(selected);
  //   showTodos(allTodos);
  console.log(allTodos);
  selected = getSelectedArray();
  if (typeof selected !== "function" && selected !== allTodos) {
    selected.push(newTodo);
    localStorage.setItem("projects", JSON.stringify(allProjects));
    localStorage.setItem("mainArray", JSON.stringify(allTodos));
  }
  // console.log(typeof selected);
  generateTodos(typeof selected === "function" ? selected() : selected);
  const TodoFormModal = document.querySelector("#todo-form-modal");
  closeForm(TodoFormModal);
  console.log(selected);
  // description.value = "";
  removeRequired(description, date, theTime);
  // getTime(data);
  // attatchTodo(data);
  // allTodos.push(data);
  // showTodos(allTodos);
});

const removeRequired = (descriptInp, dateInp, timeInp) => {
  descriptInp.required = false;
  dateInp.required = false;
  timeInp.required = false;
  descriptInp.value = "";
  dateInp.value = "";
  timeInp.value = "";
};

const getCurrentTime = () => {
  const date = new Date();
  const DateFormated = format(date, "MM/dd/yyyy - h:mm a");
  return DateFormated;
};

// editModal.addEventListener("submit", (e) => {
//   e.preventDefault();
//   selected = getSelectedArray();
//   generateTodos(typeof selected === "function" ? selected() : selected);
// });
