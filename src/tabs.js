// import { parseISO, format } from "date-fns";
// import { allTodos, generateTodos } from "./submit";

// export default () => {};

// export const getSelectedArray = () => selectedArray;
// let selectedArray = allTodos;

// const allTodoTab = document.querySelector(".all-todo-tab");
// const upcomingTodoTab = document.querySelector(".upcoming-todo-tab");

// allTodoTab.addEventListener("click", () => {
//   const title = document.querySelector(".tab-title");
//   title.innerText = "All Todo's";
//   title.classList.add("tab-title", "all-todo-active");

//   selectedArray = allTodos;
//   generateTodos(allTodos);
// });

// upcomingTodoTab.addEventListener("click", () => {
//   upcomingFormat();

//   selectedArray = upcomingFormat;

//   console.log(upcomingFormat());
//   generateTodos(upcomingFormat());
// });

// const upcomingFormat = () => {
//   console.log("heyo");

//   const formatToNum = (x) => parseFloat(format(new Date(x.date), "yyyyMMdd"));
//   const upcomingTodos = allTodos.toSorted(
//     (a, b) => formatToNum(a) - formatToNum(b)
//   );
//   return upcomingTodos;
// };
