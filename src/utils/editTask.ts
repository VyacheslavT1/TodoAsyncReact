export function editTask(
  taskItem: HTMLElement,
  taskContent: HTMLElement,
  checkIcon: HTMLElement
): void {
  if (!taskItem.classList.contains("edit-mode")) {
    taskItem.classList.add("edit-mode");
    // Используем строковые значения для contentEditable
    taskContent.setAttribute("contentEditable", "true");

    checkIcon.addEventListener(
      "click",
      () => {
        taskItem.classList.remove("edit-mode");
        taskContent.setAttribute("contentEditable", "false");
      },
      { once: true }
    );
  }
}
