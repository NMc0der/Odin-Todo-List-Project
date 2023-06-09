import { DateTime } from "luxon";
import { parseISO, format } from "date-fns";
// import { check } from "prettier";
import trashIcon from "./trash-can.png";
import editIcon from "./edit.png";
import { openForm, closeForm } from "./modal";
// import { selectedArray } from "./tabs";

export default () => {};
export { allTodos, generateTodos };

// export function mySelectedArray() {
//   return selectedArray;
// }

const todoArrays = {};

const realAllTodos = [];
const allTodos = [];
let selectedArray = allTodos;
// const selectedArray = allTodos;
const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector(".todos");
const theTime = document.querySelector(".time");

// class Todo {
//   constructor(description, date, time, priority, createdDate) {
//     this.description = description;
//     this.date = date;
//     this.time = time;
//     this.priority = priority;
//     this.createdDate = createdDate;
//   }
// }

// todoForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const description = document.querySelector("#description").value;
//   const date = document.querySelector("#date").value;
//   const formatedDate = format(parseISO(date), "MM/dd/yyyy");
//   console.log(formatedDate);
//   const priority = document.querySelector("#priority").value;
//   const time = DateTime.fromFormat(theTime.value, "HH:mm").toFormat("h:mm a");

//   const newTodo = new Todo(
//     description,
//     formatedDate,
//     time,
//     priority,
//     getCurrentTime()
//   );

//   allTodos.push(newTodo);
//   showTodos(allTodos);
//   console.log(allTodos);
//   generateTodos(allTodos);
//   const modal = document.querySelector("#todo-form-modal");
//   closeForm(modal);
// });

// const getTime = (data) => {
//   const formatedTime = DateTime.fromFormat(theTime.value, "HH:mm").toFormat(
//     "h:mm a"
//   );
//   console.log(formatedTime);
//   data.time = formatedTime;
// };

// const attatchTodo = (data) => {
//   generateTodo(data);
// };

const generateTodos = (todoArray) => {
  console.log(typeof todoArray);
  // typeof todoArray === "function" ? todoArray() : todoArray;

  todos.innerHTML = "";
  for (let i = 0; i < allTodos.length; i += 1) {
    const currentTodo = allTodos[i];

    currentTodo.number = `${i}`;
    console.log(` ${currentTodo.number}`);
  }
  for (let i = 0; i < todoArray.length; i += 1) {
    const currentTodo = todoArray[i];
    const container = document.createElement("div");
    const leftSection = document.createElement("div");
    container.classList.add("todo");
    leftSection.classList.add("todo-left");
    const todoDescript = document.createElement("span");
    const date = document.createElement("span");
    date.innerHTML = currentTodo.date;
    todoDescript.innerHTML = currentTodo.description;
    leftSection.append(todoDescript);
    leftSection.append(date);
    container.append(leftSection);
    todos.append(container);

    const rightSection = document.createElement("div");
    const editBtn = document.createElement("img");
    const trashBtn = document.createElement("img");
    trashBtn.classList.add(`deleteBtn`, `deleteBtn${i}`);
    editBtn.classList.add(`editBtn`, `editBtn${i}`);
    editBtn.src = editIcon;
    trashBtn.src = trashIcon;
    container.append(rightSection);
    rightSection.append(editBtn);
    rightSection.append(trashBtn);

    // if (todoArray === allTodos) {
    //   currentTodo.number = `${i}`;
    // }

    showPriority(container, todoArray, i);
    trashBtn.addEventListener("click", () => {
      deleteTodo(i, todoArray);
    });
    editBtn.addEventListener("click", () => {
      editTodo(i, todoArray);
    });
    container.addEventListener("click", (e) => {
      console.log(container.classList);
      console.log(allTodos);
      if (e.target.nodeName !== "IMG") {
        showInfo(todoArray, i);
      }
    });
  }
  // console.log(`i am selected `);
  // console.log()
};

const deleteTodo = (index, todoArray) => {
  console.log("hi");
  const confirmationModal = document.querySelector("#confirmation-modal");
  // const confirmBtn = document.querySelector(".delete-confirm-btn");
  // const cancelBtn = document.querySelector(".cancle-confirm-btn");

  const confirmBtns = document.querySelector(".confirm-btns");
  confirmBtns.innerHTML = "";
  const confirmBtn = document.createElement("button");
  confirmBtn.innerText = "Yes";
  confirmBtn.classList.add("confirm-btn");
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "No";
  cancelBtn.classList.add("confirm-btn");
  confirmBtns.append(confirmBtn);
  confirmBtns.append(cancelBtn);
  // confirmationModal.classList.add("active");
  openForm(confirmationModal);
  confirmBtn.addEventListener("click", () => {
    closeForm(confirmationModal);
    console.log(index);

    // console.log(todoArray[index].number);
    allTodos.splice(parseFloat(todoArray[index].number), 1);
    console.log(todoArray);
    console.log(allTodos);
    // todoArray.splice(index, 1);
    console.log(selectedArray);

    // generateTodos(allTodos);
    generateTodos(
      typeof selectedArray === "function" ? selectedArray() : selectedArray
    );

    // console.log(selectedArray);
  });
  cancelBtn.addEventListener("click", () => {
    closeForm(confirmationModal);
  });
};

const editTodo = (index, todoArray) => {
  const todo = todoArray[index];
  const editModal = document.querySelector("#edit-modal");
  // const todoLable = document.querySelector(".todo-lable");

  const currentTodoText = document.querySelector(".current-todo-text");
  const currentDateText = document.querySelector(".current-date-text");
  const currentTimeText = document.querySelector(".current-time-text");
  const currentPriorityText = document.querySelector(".current-priority-text");
  currentTodoText.innerHTML = `-${todo.description}`;
  currentDateText.innerHTML = `-${todo.date}`;
  currentTimeText.innerHTML = `-${todo.time}`;
  currentPriorityText.innerHTML = `-${todo.priority}`;
  showPriority(editModal, todoArray, index);
  openForm(editModal);
  console.log(todo);
  const editForm = document.querySelector(".edit-form");

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editDescription = document.querySelector(".edit-todo");
    const editDate = document.querySelector(".edit-date");
    const editTime = document.querySelector(".edit-time");
    const editPriority = document.querySelector(".edit-priority");
    // const formatedDate = format(parseISO(editDate), "MM/dd/yyyy");
    const formatedTime = DateTime.fromFormat(editTime.value, "HH:mm").toFormat(
      "h:mm a"
    );
    console.log(editDescription.value);
    if (editDescription.value) todo.description = editDescription.value;
    if (editDate.value)
      todo.date = format(parseISO(editDate.value), "MM/dd/yyyy");
    if (editTime.value) todo.time = formatedTime;
    // if (editPriority.value)
    todo.priority = editPriority.value;
    // if (editTime) todo.time =
    generateTodos(todoArray);
    editDescription.value = "";
    editDate.value = "";
    editTime.value = "";
    closeForm(editModal);
    console.log(todo);
    console.log(allTodos);
  });
};

const showTodos = (todoArray, index) => {
  console.log(todoArray);
  for (let i = 0; i < todoArray.length; i += 1) {}
};

const showInfo = (todoArray, index) => {
  const descriptionText = document.querySelector(".description-text");
  console.log(todoArray[index]);
  descriptionText.innerHTML = todoArray[index].description;
  const DueDateText = document.querySelector(".due-date-text");
  DueDateText.innerHTML = `${todoArray[index].date} - ${todoArray[index].time}`;
  const timeCreatedText = document.querySelector(".time-created");
  timeCreatedText.innerHTML = todoArray[index].createdDate;
  // const PriorityText = document.querySelector(".priority-text");
  const infoModal = document.querySelector("#info-modal");
  // infoModal.classList.add("active");
  openForm(infoModal);
  showPriority(infoModal, todoArray, index);
};

const getCurrentTime = () => {
  const date = new Date();
  const DateFormated = format(date, "MM/dd/yyyy - h:mm a");
  return DateFormated;
};

const showPriority = (container, todoArray, index) => {
  const priorityText = document.querySelector(".priority-text");
  if (todoArray[index].priority === "Low Priority") {
    // console.log(todoArray);
    container.classList.add("low-priority");
    container.classList.remove("medium-priority", "high-priority");
    priorityText.innerHTML = todoArray[index].priority;
    priorityText.style.color = "#aaf683";
  } else if (todoArray[index].priority === "Medium Priority") {
    container.classList.add("medium-priority");
    container.classList.remove("low-priority", "high-priority");
    priorityText.innerHTML = todoArray[index].priority;
    priorityText.style.color = "#ffd60a";
  } else if (todoArray[index].priority === "High Priority") {
    container.classList.add("high-priority");
    container.classList.remove("low-priority", "medium-priority");
    priorityText.innerHTML = todoArray[index].priority;
    priorityText.style.color = "#ef233c";
  }
};

//

export const getSelectedArray = () => selectedArray;

const allTodoTab = document.querySelector(".all-todo-tab");
const upcomingTodoTab = document.querySelector(".upcoming-todo-tab");
const todayTodoTab = document.querySelector(".today-todo-tab");
const weekTodoTab = document.querySelector(".week-todo-tab");
allTodoTab.addEventListener("click", () => {
  // const todosHolder = document.querySelector(".todo-holder");
  // const title = document.createElement("h2");
  const title = document.querySelector(".tab-title");
  title.innerText = "All Todo's";
  title.classList.add("tab-title", "all-todo-active");
  // todosHolder.prepend(title);
  selectedArray = allTodos;
  generateTodos(allTodos);
  // console.log(
  //   DateTime.fromFormat(allTodos[0].date, "MM/dd/yyyy").toFormat("yyyyMMdd")
  // );
});

upcomingTodoTab.addEventListener("click", () => {
  upcomingFormat();
  // console.log(format(new Date(allTodos[0].date), "yyyyMMdd"));
  // console.log(allTodos[0].date);
  // console.log(typeof allTodos[0].date);
  // console.log(
  //   typeof parseFloat(format(new Date(allTodos[0].date), "yyyyMMdd"))
  // );

  selectedArray = upcomingFormat;

  // console.log(upcomingTodos);
  console.log(upcomingFormat());
  generateTodos(upcomingFormat());
});

const upcomingFormat = () => {
  console.log("heyo");

  const formatToNum = (x) => parseFloat(format(new Date(x.date), "yyyyMMdd"));
  const upcomingTodos = allTodos.toSorted(
    (a, b) => formatToNumber(a) - formatToNumber(b)
  );

  // sortByTime(upcomingTodos);
  return upcomingTodos;
};

const formatToNumber = (x) => {
  const date = format(new Date(x.date), "yyyyMMdd");
  const time = DateTime.fromFormat(x.time, "h:mm a").toFormat("HHmm");
  return parseFloat(`${date}${time}`);
};

todayTodoTab.addEventListener("click", () => {
  console.log(todayFormat());
  selectedArray = todayFormat;
  generateTodos(todayFormat());
});

const todayFormat = () => {
  console.log("hi");
  allTodos.forEach((todo) => {
    console.log(todo.date);
    console.log(todo.time);
    console.log(formatToNumber(todo));
    console.log(DateTime.fromFormat(todo.time, "h:mm a").toFormat("HHmm"));
    if (getCurrentdate() === todo.date) {
      console.log("the dates match!");
    }
  });

  console.log(getCurrentdate());
  const todayTodos = allTodos.filter((todo) => todo.date === getCurrentdate());
  sortByTime(todayTodos);
  console.log(todayTodos);
  return todayTodos;
};

const getCurrentdate = () => {
  const date = new Date();
  const DateFormated = format(date, "MM/dd/yyyy");
  return DateFormated;
};

const sortByTime = (ary) => {
  ary.sort((a, b) => {
    console.log(a.time);
    console.log(formatToTime(a.time));
    return formatToTime(a.time) - formatToTime(b.time);
  });
};

// if (getCurrentdate() === todo.date) {
//   return todo;
// }

const formatToTime = (x) => DateTime.fromFormat(x, "h:mm a").toFormat("HHmm");

// const formatedTime = DateTime.fromFormat(editTime.value, "HH:mm").toFormat(
//   "h:mm a"
// );
weekTodoTab.addEventListener("click", () => {
  console.log(weekFormat());
});

const weekFormat = () => {
  console.log("hiya");
};
