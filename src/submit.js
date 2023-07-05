import { DateTime } from "luxon";
import { parseISO, format } from "date-fns";
import trashIcon from "./trash-can.png";
import editIcon from "./edit.png";
import { openForm, closeForm } from "./modal";
import { todayFormat, weekFormat, upcomingFormat } from "./tabs";

export default () => {};
export { allTodos, generateTodos };

export const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");

const allTodos = JSON.parse(localStorage.getItem("mainArray") || "[]");
let selectedArray = allTodos;

const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector(".todos");
const theTime = document.querySelector(".time");

const generateTodos = (todoArray) => {
  todos.innerHTML = "";
  for (let i = 0; i < allTodos.length; i += 1) {
    const currentTodo = allTodos[i];
    currentTodo.number = `${i}`;
    localStorage.setItem("mainArray", JSON.stringify(allTodos));
    localStorage.setItem("projects", JSON.stringify(allProjects));
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

    showPriority(container, todoArray, i);
    trashBtn.addEventListener("click", () => {
      deleteTodo(i, todoArray);
    });
    editBtn.addEventListener("click", () => {
      editTodo(i, todoArray);
    });
    container.addEventListener("click", (e) => {
      if (e.target.nodeName !== "IMG") {
        showInfo(todoArray, i);
      }
    });
  }

  localStorage.setItem("mainArray", JSON.stringify(allTodos));
  localStorage.setItem("projects", JSON.stringify(allProjects));
};

const deleteTodo = (index, todoArray) => {
  const confirmationModal = document.querySelector("#confirmation-modal");
  confirmModalDisplay("Todo");
  const confirmBtn = document.querySelector(".yes-confirm-btn");
  const cancelBtn = document.querySelector(".no-confirm-btn");

  confirmBtn.addEventListener("click", () => {
    closeForm(confirmationModal);

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

    allTodos.splice(parseFloat(todoArray[index].number), 1);
    localStorage.setItem("mainArray", JSON.stringify(allTodos));
    localStorage.setItem("projects", JSON.stringify(allProjects));

    if (typeof selectedArray !== "function" && selectedArray !== allTodos) {
      selectedArray.splice(index, 1);
      localStorage.setItem("projects", JSON.stringify(allProjects));
    }
    console.log(selectedArray);

    generateTodos(
      typeof selectedArray === "function" ? selectedArray() : selectedArray
    );
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
  currentlyEditing = todo;
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editDescription = document.querySelector(".edit-todo");
  console.log(editDescription);
  const editDate = document.querySelector(".edit-date");
  const editTime = document.querySelector(".edit-time");
  const editPriority = document.querySelector(".edit-priority");
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
    project.projectArray444.forEach((todo) => {
      if (JSON.stringify(todo) === JSON.stringify(currentlyEditing)) {
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

  if (editDescription.value) {
    console.log("im a string");
    console.log(currentlyEditing);

    currentlyEditing.description = editDescription.value;
  }

  if (editDate.value) {
    currentlyEditing.date = format(parseISO(editDate.value), "MM/dd/yyyy");
  }
  if (editTime.value) {
    currentlyEditing.time = formatedTime;
  }
  currentlyEditing.priority = editPriority.value;

  generateTodos(selectedArray);
  editDescription.value = "";
  editDate.value = "";
  editTime.value = "";
  closeForm(editModal);

  localStorage.setItem("mainArray", JSON.stringify(allTodos));
  localStorage.setItem("projects", JSON.stringify(allProjects));
});

// const showTodos = (todoArray, index) => {
//   console.log(todoArray);
//   for (let i = 0; i < todoArray.length; i += 1) {}
// };

const showInfo = (todoArray, index) => {
  const descriptionText = document.querySelector(".description-text");
  descriptionText.innerHTML = todoArray[index].description;
  const DueDateText = document.querySelector(".due-date-text");
  DueDateText.innerHTML = `${todoArray[index].date} - ${todoArray[index].time}`;
  const timeCreatedText = document.querySelector(".time-created");
  timeCreatedText.innerHTML = todoArray[index].createdDate;

  const infoModal = document.querySelector("#info-modal");

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

export const getSelectedArray = () => selectedArray;

const allTodoTab = document.querySelector(".all-todo-tab");
const upcomingTodoTab = document.querySelector(".upcoming-todo-tab");
const todayTodoTab = document.querySelector(".today-todo-tab");
const weekTodoTab = document.querySelector(".week-todo-tab");
const addProjectBtn = document.querySelector(".project-add");
const title = document.querySelector(".tab-title");

const sideBarBtn = document.querySelector(".hamburger-input");
const mediaQuerySmall = window.matchMedia("(max-width: 405px");

const handleSmallMediaChange = (e) => {
  console.log("yo");
  if (e.matches) {
    console.log("it matched again!");
    sideBarBtn.checked = false;
  }
};

// mediaQuerySmall.addListener(handleSmallMediaChange);
// handleSmallMediaChange(mediaQuerySmall);

allTodoTab.addEventListener("click", () => {
  title.innerText = "All Todo's";
  title.classList.add("tab-title", "all-todo-active");

  selectedArray = allTodos;
  // console.log(mediaQuerySmall);
  // mediaQuerySmall.addListener(handleSmallMediaChange);
  handleSmallMediaChange(mediaQuerySmall);
  // sideBarBtn.checked = false;

  console.log(sideBarBtn);
  console.log("borger");
  generateTodos(allTodos);
});

upcomingTodoTab.addEventListener("click", () => {
  title.innerText = "Upcoming Todo's";
  handleSmallMediaChange(mediaQuerySmall);
  selectedArray = upcomingFormat(allTodos);

  generateTodos(selectedArray);
});

todayTodoTab.addEventListener("click", () => {
  title.innerText = "Today's Todo's";
  console.log(todayFormat(allTodos));
  selectedArray = todayFormat(allTodos);
  handleSmallMediaChange(mediaQuerySmall);
  generateTodos(selectedArray);
});

weekTodoTab.addEventListener("click", () => {
  title.innerText = "Weekly Todo's";
  selectedArray = weekFormat(allTodos);
  handleSmallMediaChange(mediaQuerySmall);
  generateTodos(selectedArray);
});

const ProjectAddForm = document.querySelector("#project-add-form");
const cancleProjectBtn = document.querySelector(".cancle-project-btn");
const projectInp = document.querySelector(".name-project-inp");
const projectList = document.querySelector(".project-list");

addProjectBtn.addEventListener("click", () => {
  projectInp.value = "";
  ProjectAddForm.style.display = "block";
  projectInp.focus();
  addProjectBtn.style.display = "none";
  console.log("new project");
});

cancleProjectBtn.addEventListener("click", () => {
  ProjectAddForm.style.display = "none";
  addProjectBtn.style.display = "flex";
});

class Project {
  constructor(name) {
    this.name = name;
    this.projectArray444 = [];
  }
}

ProjectAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const project = document.createElement("div");
  const newProject = new Project(projectInp.value);
  project.classList.add("addedProject");
  project.append(projectInp.value);
  project.addEventListener("click", () => {
    newProject.projectArray444 = newProject.projectArray444.filter((todo) =>
      allTodos.includes(todo)
    );

    localStorage.setItem("projects", JSON.stringify(allProjects));
    selectedArray = newProject.projectArray444;

    generateTodos(selectedArray);
    generateProjects(allProjects);
  });

  allProjects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(allProjects));
  console.log(newProject);

  ProjectAddForm.style.display = "none";
  addProjectBtn.style.display = "flex";

  projectList.append(project);
  generateProjects(allProjects);
});

export const generateProjects = (projects) => {
  console.log("hi projects");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const tab = document.createElement("div");
    tab.classList.add("project-tab");
    tab.innerHTML = project.name;
    const trashProjectBtn = document.createElement("img");
    trashProjectBtn.classList.add("tab-delete-btn");
    trashProjectBtn.src = trashIcon;
    tab.append(trashProjectBtn);
    projectList.append(tab);

    tab.addEventListener("click", (e) => {
      handleSmallMediaChange(mediaQuerySmall);

      if (e.target.nodeName !== "IMG") {
        project.projectArray444 = project.projectArray444.filter((todo) =>
          JSON.stringify(allTodos).includes(JSON.stringify(todo))
        );
        title.innerText = `${project.name}`;

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
        title.innerText = `All Todo's`;

        selectedArray = allTodos;
        generateTodos(selectedArray);
        closeForm(confirmationModal);
      });

      cancelBtn.addEventListener("click", () => {
        closeForm(confirmationModal);
      });
    });
  });
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
  openForm(confirmationModal);
};
