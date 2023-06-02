export default () => {};
export { openForm, closeForm };
const createTodoBtn = document.querySelectorAll("[data-modal-target]");
const closeTodoBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.querySelector("#overlay");

createTodoBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openForm(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeForm(modal);
  });
});

closeTodoBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeForm(modal);
  });
});

function openForm(form) {
  if (form == null) return;
  form.classList.add("active");
  overlay.classList.add("active");
}

function closeForm(form) {
  if (form == null) return;
  form.classList.remove("active");
  overlay.classList.remove("active");
}
