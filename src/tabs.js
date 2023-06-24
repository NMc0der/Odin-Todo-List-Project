import { DateTime } from "luxon";
import { parseISO, format } from "date-fns";
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

export const upcomingFormat = (originArray) => {
  console.log("heyo");

  //   const formatToNum = (x) => parseFloat(format(new Date(x.date), "yyyyMMdd"));
  const upcomingTodos = originArray.toSorted(
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

export const todayFormat = (originArray) => {
  console.log("hi");

  originArray.forEach((todo) => {
    console.log(todo.date);
    console.log(todo.time);
    console.log(formatToNumber(todo));
    console.log(DateTime.fromFormat(todo.time, "h:mm a").toFormat("HHmm"));
    if (getCurrentdate() === todo.date) {
      console.log("the dates match!");
    }
  });

  //   allTodos.forEach((todo) => {
  //     console.log(todo.date);
  //     console.log(todo.time);
  //     console.log(formatToNumber(todo));
  //     console.log(DateTime.fromFormat(todo.time, "h:mm a").toFormat("HHmm"));
  //     if (getCurrentdate() === todo.date) {
  //       console.log("the dates match!");
  //     }
  //   });

  console.log(getCurrentdate());
  const todayTodos = originArray.filter(
    (todo) => todo.date === getCurrentdate()
  );
  sortByTime(todayTodos);
  console.log(todayTodos);
  return todayTodos;
};

export const getCurrentdate = () => {
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

const formatToTime = (x) => DateTime.fromFormat(x, "h:mm a").toFormat("HHmm");

export const weekFormat = (originArray) => {
  console.log("hiya");
  originArray.forEach((todo) => {
    console.log(todo.date);
    console.log(format(new Date(), "MM/dd/yyyy I"));
    console.log(format(new Date(todo.date), "yyyyMMdd I"));
  });

  const weekTodos = originArray.filter((todo) => {
    const todoWeekNum = format(new Date(todo.date), "I");
    const currentWeek = format(new Date(), "I");
    return todoWeekNum === currentWeek;
  });
  weekTodos.sort((a, b) => formatToNumber(a) - formatToNumber(b));
  return weekTodos;
  // console.log(weekTodos);
};
