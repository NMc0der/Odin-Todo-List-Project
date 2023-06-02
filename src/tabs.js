import { parseISO, format } from "date-fns";
import { allTodos, generateTodos } from "./submit";

export default () => {};

// const selected = mySelectedArray;
export const selectedArray = [];

const allTodoTab = document.querySelector(".all-todo-tab");
const upcomingTodoTab = document.querySelector(".upcoming-todo-tab");

allTodoTab.addEventListener("click", () => {
  // const todosHolder = document.querySelector(".todo-holder");
  // const title = document.createElement("h2");
  const title = document.querySelector(".tab-title");
  title.innerText = "All Todo's";
  title.classList.add("tab-title", "all-todo-active");
  // todosHolder.prepend(title);
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
});

const upcomingFormat = () => {
  const formatToNum = (x) => parseFloat(format(new Date(x.date), "yyyyMMdd"));
  const upcomingTodos = allTodos.toSorted(
    (a, b) => formatToNum(a) - formatToNum(b)
    // if (a.date > b.date) {
    //   return 1;
    // }
    // return -1;

    // return a.date - b.date;
  );
  console.log(upcomingTodos);
  generateTodos(upcomingTodos);
};

// 2022-01-30
// 2023-05-20
// const date = new Date("2020/09/19");
// console.log(date);

// console.log(format(new Date("2020/09/19")), "EEEE,MMMM do, yyyy hh:mm a");
// console.log(`${format(date, "EEEE,MMMM do, yyyy hh:mm a")}`);
