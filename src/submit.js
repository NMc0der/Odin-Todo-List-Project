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

// const allTodos = localStorage.getItem("mainArray")
//   ? JSON.parse(localStorage.getItem("mainArray"))
//   : [];

const allTodos = JSON.parse(localStorage.getItem("mainArray") || "[]");

export const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
// export const allProjects = [];
// const allTodos = [];
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
    localStorage.setItem("mainArray", JSON.stringify(allTodos));
    localStorage.setItem("projects", JSON.stringify(allProjects));
    // console.log(` ${currentTodo.number}`);
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

  localStorage.setItem("mainArray", JSON.stringify(allTodos));
  localStorage.setItem("projects", JSON.stringify(allProjects));

  // allProject2.forEach((project) => {
  //   console.log("yo hello yo");
  //   if (project.ary === selectedArray) {
  //     console.log("yo hello yo");
  //   }
  // });

  // projectList.innerHTML = localStorage.getItem("projectList");

  // console.log(`i am selected `);
  // console.log()
};

const deleteTodo = (index, todoArray) => {
  console.log("hi");
  const confirmationModal = document.querySelector("#confirmation-modal");
  // const confirmBtn = document.querySelector(".delete-confirm-btn");
  // const cancelBtn = document.querySelector(".cancle-confirm-btn");

  confirmModalDisplay("Todo");

  // const confirmBtns = document.querySelector(".confirm-btns");
  // confirmBtns.innerHTML = "";
  // const confirmBtn = document.createElement("button");
  // confirmBtn.innerText = "Yes";
  // confirmBtn.classList.add("confirm-btn");
  // const cancelBtn = document.createElement("button");
  // cancelBtn.innerText = "No";
  // cancelBtn.classList.add("confirm-btn");
  // confirmBtns.append(confirmBtn);
  // confirmBtns.append(cancelBtn);
  // confirmationModal.classList.add("active");
  const confirmBtn = document.querySelector(".yes-confirm-btn");
  const cancelBtn = document.querySelector(".no-confirm-btn");

  // openForm(confirmationModal);
  confirmBtn.addEventListener("click", () => {
    closeForm(confirmationModal);
    console.log(index);

    allProjects.forEach((project) => {
      console.log(project.projectArray444);
      project.projectArray444.forEach((todo) => {
        console.log(typeof todo.number);
        if (parseFloat(todoArray[index].number) < parseFloat(todo.number)) {
          todo.number = (parseFloat(todo.number) - 1).toString();
          console.log("hi");
        }
      });
    });

    // console.log(typeof parseFloat(todoArray[index].number));
    allTodos.splice(parseFloat(todoArray[index].number), 1);
    localStorage.setItem("mainArray", JSON.stringify(allTodos));
    localStorage.setItem("projects", JSON.stringify(allProjects));
    console.log(todoArray);
    console.log(allTodos);
    // todoArray.splice(index, 1);
    console.log(selectedArray);

    if (typeof selectedArray !== "function" && selectedArray !== allTodos) {
      selectedArray.splice(index, 1);
      localStorage.setItem("projects", JSON.stringify(allProjects));
      console.log("im the array");
    }
    console.log(selectedArray);
    // generateTodos(allTodos);

    generateTodos(
      typeof selectedArray === "function" ? selectedArray() : selectedArray
    );

    // const myObjSeralized = JSON.stringify(selectedArray);

    // localStorage.setItem("mainArray", myObjSeralized);

    // console.log(selectedArray);
  });
  cancelBtn.addEventListener("click", () => {
    closeForm(confirmationModal);
  });
};
const editForm = document.querySelector(".edit-form");
let currentlyEditing = "";
const editModal = document.querySelector("#edit-modal");

const editTodo = (index, todoArray) => {
  const todo = todoArray[index];

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
  console.log("the todo");
  // const editForm = document.querySelector(".edit-form");
  currentlyEditing = todo;

  // editForm.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   let editDescription = document.querySelector(".edit-todo").value;
  //   console.log(editDescription);
  //   const editDate = document.querySelector(".edit-date");
  //   const editTime = document.querySelector(".edit-time");
  //   const editPriority = document.querySelector(".edit-priority");
  //   // const formatedDate = format(parseISO(editDate), "MM/dd/yyyy");
  //   const formatedTime = DateTime.fromFormat(editTime.value, "HH:mm").toFormat(
  //     "h:mm a"
  //   );
  //   console.log(todo);
  //   if (editDescription) {
  //     console.log(editDescription);
  //     console.log(todo.description);
  //     console.log("im a string");
  //     console.log(todo);
  //     currentlyEditing = editDescription;
  //   }

  //   if (editDate.value) {
  //     todo.date = format(parseISO(editDate.value), "MM/dd/yyyy");
  //   }
  //   if (editTime.value) {
  //     todo.time = formatedTime;
  //   }
  //   // if (editPriority.value)
  //   todo.priority = editPriority.value;
  //   // if (editTime) todo.time =
  //   generateTodos(todoArray);
  //   editDescription = "";
  //   editDate.value = "";
  //   editTime.value = "";
  //   closeForm(editModal);
  //   // console.log(todo);
  //   // console.log(allTodos);
  //   localStorage.setItem("mainArray", JSON.stringify(allTodos));
  //   localStorage.setItem("projects", JSON.stringify(allProjects));
  // });
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editDescription = document.querySelector(".edit-todo");
  console.log(editDescription);
  const editDate = document.querySelector(".edit-date");
  const editTime = document.querySelector(".edit-time");
  const editPriority = document.querySelector(".edit-priority");
  // const formatedDate = format(parseISO(editDate), "MM/dd/yyyy");
  const formatedTime = DateTime.fromFormat(editTime.value, "HH:mm").toFormat(
    "h:mm a"
  );

  if (selectedArray !== allTodos) {
    allTodos.forEach((todo) => {
      if (JSON.stringify(todo) === JSON.stringify(currentlyEditing)) {
        if (editDescription.value) todo.description = editDescription.value;
        if (editDate.value)
          todo.date = format(parseISO(editDate.value), "MM/dd/yyyy");
        if (editTime.value) todo.time = formatedTime;
        todo.priority = editPriority.value;
        localStorage.setItem("mainArray", JSON.stringify(allTodos));
        localStorage.setItem("projects", JSON.stringify(allProjects));
        console.log("now im the Same!");
      }
    });
  }

  allProjects.forEach((project) => {
    console.log(project);
    project.projectArray444.forEach((todo) => {
      console.log(todo);
      console.log(currentlyEditing);
      console.log(JSON.stringify(todo));
      console.log(JSON.stringify(currentlyEditing));
      if (JSON.stringify(todo) === JSON.stringify(currentlyEditing)) {
        console.log(todo);
        console.log("it is the same one bro!");
        if (editDescription.value) todo.description = editDescription.value;
        if (editDate.value)
          todo.date = format(parseISO(editDate.value), "MM/dd/yyyy");
        if (editTime.value) todo.time = formatedTime;
        todo.priority = editPriority.value;
        localStorage.setItem("mainArray", JSON.stringify(allTodos));
        localStorage.setItem("projects", JSON.stringify(allProjects));
      }
    });
  });

  // console.log(todo);
  if (editDescription.value) {
    // console.log(editDescription);
    // console.log(todo.description);
    console.log("im a string");
    console.log(currentlyEditing);
    // console.log(todo);
    currentlyEditing.description = editDescription.value;
  }

  if (editDate.value) {
    currentlyEditing.date = format(parseISO(editDate.value), "MM/dd/yyyy");
  }
  if (editTime.value) {
    currentlyEditing.time = formatedTime;
  }
  currentlyEditing.priority = editPriority.value;

  // if (editTime) currentlyEditing.time =
  generateTodos(currentlyEditing);
  generateTodos(selectedArray);
  editDescription.value = "";
  editDate.value = "";
  editTime.value = "";
  closeForm(editModal);
  // console.log(todo);
  // console.log(allTodos);

  localStorage.setItem("mainArray", JSON.stringify(allTodos));
  localStorage.setItem("projects", JSON.stringify(allProjects));
});

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
  const editPriority = document.querySelector(".edit-priority");
  if (todoArray[index].priority === "Low Priority") {
    // console.log(todoArray);
    container.classList.add("low-priority");
    container.classList.remove("medium-priority", "high-priority");
    editPriority.value = "Low Priority";
    priorityText.innerHTML = todoArray[index].priority;
    priorityText.style.color = "#aaf683";
  } else if (todoArray[index].priority === "Medium Priority") {
    container.classList.add("medium-priority");
    container.classList.remove("low-priority", "high-priority");
    editPriority.value = "Medium Priority";
    priorityText.innerHTML = todoArray[index].priority;
    priorityText.style.color = "#ffd60a";
  } else if (todoArray[index].priority === "High Priority") {
    container.classList.add("high-priority");
    container.classList.remove("low-priority", "medium-priority");
    editPriority.value = "High Priority";
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
const addProjectBtn = document.querySelector(".project-add");

allTodoTab.addEventListener("click", () => {
  // const todosHolder = document.querySelector(".todo-holder");
  // const title = document.createElement("h2");
  const title = document.querySelector(".tab-title");
  title.innerText = "All Todo's";
  title.classList.add("tab-title", "all-todo-active");
  // todosHolder.prepend(title);
  selectedArray = allTodos;
  // const jsonSelected = JSON.stringify(selectedArray);
  // localStorage.setItem("mainArray", jsonSelected);
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
  // const getSelectedArray = JSON.parse(localStorage.getItem("mainArray"));

  // const jsonSelected = JSON.stringify(selectedArray());
  // localStorage.setItem("mainArray", jsonSelected);
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
  selectedArray = weekFormat;
  generateTodos(weekFormat());
});

const weekFormat = () => {
  console.log("hiya");
  allTodos.forEach((todo) => {
    console.log(todo.date);
    console.log(format(new Date(), "MM/dd/yyyy I"));
    console.log(format(new Date(todo.date), "yyyyMMdd I"));
  });

  const weekTodos = allTodos.filter((todo) => {
    const todoWeekNum = format(new Date(todo.date), "I");
    const currentWeek = format(new Date(), "I");
    return todoWeekNum === currentWeek;
  });
  weekTodos.sort((a, b) => formatToNumber(a) - formatToNumber(b));
  return weekTodos;
  // console.log(weekTodos);
};

const ProjectAddForm = document.querySelector("#project-add-form");
const cancleProjectBtn = document.querySelector(".cancle-project-btn");
const projectInp = document.querySelector(".name-project-inp");
const projectList = document.querySelector(".project-list");

addProjectBtn.addEventListener("click", () => {
  // openMiniForm(ProjectAddForm);
  projectInp.value = "";
  ProjectAddForm.style.display = "block";
  projectInp.focus();
  addProjectBtn.style.display = "none";
  console.log("new project");
});

cancleProjectBtn.addEventListener("click", () => {
  ProjectAddForm.style.display = "none";
  addProjectBtn.style.display = "block";
});

// document.addEventListener("click", (e) => {
//   console.dir(e.target);
//   console.log(e.target.parentElement);
//   if (
//     !e.target.parentElement.matches("#project-add-form") &&
//     !e.target.matches(".project-add")
//   ) {
//     ProjectAddForm.style.display = "none";
//     addProjectBtn.style.display = "block";
//     console.log("yoooo");
//   }
// });

class Project {
  constructor(name) {
    this.name = name;
    this.projectArray444 = [];
  }
}

const allProject2 = [];

ProjectAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // let projectArray = [];
  const project = document.createElement("div");
  const newProject = new Project(projectInp.value);
  project.classList.add("addedProject");
  project.append(projectInp.value);
  project.addEventListener("click", () => {
    // projectArray = projectArray.filter((todo) => allTodos.includes(todo));
    // newProject.projectArray = projectArray;
    console.log(newProject.projectArray444);
    newProject.projectArray444 = newProject.projectArray444.filter((todo) =>
      allTodos.includes(todo)
    );

    // projectArray.forEach((proj) => {
    //   newProject.ary.push(proj);
    //   console.log(newProject);
    // });

    // projectArray.forEach((todo) => {
    //   if (!allTodos.includes(todo)) {
    //     projectArray.splice()
    //   }
    // });
    localStorage.setItem("projects", JSON.stringify(allProjects));
    selectedArray = newProject.projectArray444;
    // console.log(projectArray);
    // selectedArray = projectArray;

    generateTodos(selectedArray);
    generateProjects(allProjects);
  });

  allProjects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(allProjects));
  console.log(newProject);
  // setInterval(() => {
  //   console.log(newProject);
  //   console.log(allProjects);
  // }, 3000);
  ProjectAddForm.style.display = "none";
  addProjectBtn.style.display = "block";
  // allProjects.push(newProject);
  // localStorage.setItem("allProjects", JSON.stringify(allProjects));
  // localStorage.setItem("project", JSON.stringify(project));
  projectList.append(project);
  generateProjects(allProjects);
  // localStorage.setItem("projectList", projectList.outerHTML);
});

// projectList.addEventListener("click", (e) => {
//   console.log(e.target.nodeName);
//   if (e.target.nodeName === "DIV") {

//   }
// });

export const generateProjects = (projects) => {
  console.log("hi projects");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    console.log(project);
    const tab = document.createElement("div");
    tab.classList.add("project-tab");
    tab.innerHTML = project.name;
    const trashProjectBtn = document.createElement("img");
    trashProjectBtn.classList.add("tab-delete-btn");
    trashProjectBtn.src = trashIcon;
    tab.append(trashProjectBtn);
    projectList.append(tab);

    tab.addEventListener("click", (e) => {
      if (e.target.nodeName !== "IMG") {
        console.log(project.projectArray444[0]);
        console.log(JSON.stringify(project.projectArray444));
        // const arrayMain = localStorage.getItem("mainarray");
        // console.log(arrayMain);

        // const mainArray = JSON.parse(localStorage.getItem("mainArray") || "[]");
        // mainArray.forEach((arry) => {
        //   console.log(arry);
        //   console.log(JSON.stringify(arry));
        //   if (
        //     JSON.stringify(arry) === JSON.stringify(project.projectArray444[0])
        //   ) {
        //     console.log("hip hip huray!");
        //   }
        //   if (arry === project.projectArray444[0]) {
        //     console.log("it is the same!");
        //   }
        // });

        // project.projectArray444 = project.projectArray444.filter((todo) => {
        //   console.log(todo);
        //   return !mainArray.includes(todo);
        // });
        project.projectArray444 = project.projectArray444.filter((todo) =>
          JSON.stringify(allTodos).includes(JSON.stringify(todo))
        );
        // console.log(mainArray);
        // console.log(allTodos);
        console.log(project.projectArray444);
        localStorage.setItem("mainArray", JSON.stringify(allTodos));
        localStorage.setItem("projects", JSON.stringify(allProjects));

        selectedArray = project.projectArray444;
        generateTodos(selectedArray);
      }
    });

    trashProjectBtn.addEventListener("click", () => {
      confirmModalDisplay("Project");
      const confirmationModal = document.querySelector("#confirmation-modal");
      const confirmBtn = document.querySelector(".yes-confirm-btn");
      const cancelBtn = document.querySelector(".no-confirm-btn");

      confirmBtn.addEventListener("click", () => {
        console.log("trash btn yo");
        console.log(projects.indexOf(project));
        projects.splice(projects.indexOf(project), 1);

        generateProjects(projects);
        selectedArray = allTodos;
        generateTodos(selectedArray);
        closeForm(confirmationModal);
      });
      cancelBtn.addEventListener("click", () => {
        closeForm(confirmationModal);
      });
    });
  });

  // for (let i = 0; i < projects.length; i += 1) {
  //   console.log(projects[i]);
  //   const tab = document.createElement("div");
  //   tab.classList.add("project-tab");
  //   tab.innerHTML = projects[i].name;
  //   const trashBtn = document.createElement("img");
  //   trashBtn.classList.add("tab-delete-btn");
  //   trashBtn.src = trashIcon;
  //   tab.append(trashBtn);
  //   projectList.append(tab);

  //   tab.addEventListener("click", () => {
  //     projects[i].projectArray = projects[i].projectArray.filter((todo) =>
  //       allTodos.includes(todo)
  //     );
  //     localStorage.setItem("projects", JSON.stringify(allProjects));
  //     selectedArray = projects[i].projectArray;
  //     generateTodos(selectedArray);
  //   });
  // }
};

const confirmModalDisplay = (titleText) => {
  const confirmationModal = document.querySelector("#confirmation-modal");
  const title = document.querySelector(".confirmation-title");
  title.innerHTML = `${titleText} Will be Deleted!`;
  const confirmBtns = document.querySelector(".confirm-btns");
  confirmBtns.innerHTML = "";
  const confirmBtn = document.createElement("button");
  confirmBtn.innerText = "Yes";
  confirmBtn.classList.add("confirm-btn", "yes-confirm-btn");
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "No";
  cancelBtn.classList.add("confirm-btn", "no-confirm-btn");
  confirmBtns.append(confirmBtn);
  confirmBtns.append(cancelBtn);
  // confirmationModal.classList.add("active");
  openForm(confirmationModal);
};

// const deleteProject = () => {

// }

// const newProjectArray = () => {};

// 2 arrays
