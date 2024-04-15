"use strict";
import { TaskManager, Tasks } from "./manager";
import { elements, clearUI, updateStorage, createStructureOfTask } from "./dom";
import {
  checkTaskValidation,
  checkObtainFromStorage,
  ShortDescriptionError,
  LongDescriptionError,
  HandlerTaskError,
  RenderError,
  DeleteError,
  EventListenerError,
  ERRORS,
} from "./errors";
import { nanoid } from "nanoid";

const taskManager = new TaskManager();

function loadingActions() {
  const currentTasks: Tasks.Current | null =
    checkObtainFromStorage();
  if (!currentTasks) return;
  currentTasks.forEach(([id, {name, priority, status}]) => {
    taskManager.addTask(id, name, priority, status);
  });
  clearUI();
  addTaskToUI(taskManager.tasks);
}

function handlerTask(event: Event) {
  event.preventDefault();
  const type = event.currentTarget === elements.forms.hp ? "hp" : "lp";
  const priority = type === "hp" ? "HIGH" : "LOW";
  try {
  const input = elements.inputs[type];
  if (!input) throw new HandlerTaskError(ERRORS.HANDLER_TASK_ERROR_MESSAGE);
  const name = input.value;
  const id = nanoid();
    checkTaskValidation(name);
    taskManager.addTask(id, name, priority);
    updateUIAndStorage(taskManager.tasks);
    input.value = "";
  } catch (error) {
    if (!elements.errorOutput)
      throw new HandlerTaskError(ERRORS.HANDLER_TASK_ERROR_MESSAGE);
    if (error instanceof ShortDescriptionError || error instanceof LongDescriptionError) {
      elements.errorOutput.textContent = error.message
    } else {
      console.error(error instanceof HandlerTaskError ? error.message : error);
    }
  }
}

function addTaskToUI(tasks: Map<string, Tasks.Description>) {
  try {
    tasks.forEach((task, id) => {
      const name = task.name;
      const priority = task.priority;
      const status = task.status;
      const section =
        priority === "HIGH" ? elements.sections.hp : elements.sections.lp;
      if (!section) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      const newTask = createStructureOfTask({id, content: name, priority, status});
      if (!newTask) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      const span: HTMLSpanElement | null = newTask.querySelector("span");
      if (!span) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      const firstOption: HTMLSelectElement | null =
        newTask.querySelector("select");
      if (!firstOption) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      const secondOption =
        firstOption.nextElementSibling instanceof HTMLSelectElement
          ? firstOption.nextElementSibling
          : null;
      if (!secondOption) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      section.append(newTask);
      span.addEventListener("click", deleteTask);
      firstOption.addEventListener("change", changePriorityAndStatus);
      secondOption.addEventListener("change", changePriorityAndStatus);
    });
  } catch (error) {
    console.error(error instanceof RenderError ? error.message : error);
  }
}

function changePriorityAndStatus(event: Event) {
  try {
    const select = event.currentTarget as HTMLSelectElement;
    if (!select) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
    const task =
      select.parentElement instanceof HTMLDivElement
        ? select.parentElement
        : null;
    if (!task) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
    const name = task.firstChild ? task.firstChild.nodeValue : null;
    const status =
      select.nextSibling instanceof HTMLSelectElement
        ? select.nextSibling
        : null;
    if (!status) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
    if (select.classList.contains("priority")) {
      taskManager.addTask(task.id, name ?? "", select.value, status.value);
    } else {
      const priority =
        select.previousSibling instanceof HTMLSelectElement
          ? select.previousSibling
          : null;
      if (!priority) throw new RenderError(ERRORS.RENDER_ERROR_MESSAGE);
      taskManager.addTask(task.id, name ?? "", priority.value, select.value);
    }
  } catch (error) {
    console.error(error instanceof RenderError ? error.message : error);
  }
  updateUIAndStorage(taskManager.tasks);
}

function deleteTask(event: Event) {
  try {
    const span = event.currentTarget as HTMLSpanElement;
    if (!span) throw new DeleteError(ERRORS.DELETE_ERROR_MESSAGE);
    const task =
      span.parentElement instanceof HTMLDivElement ? span.parentElement : null;
    if (!task) throw new DeleteError(ERRORS.DELETE_ERROR_MESSAGE);
    const priority: HTMLSelectElement | null = task.querySelector(".priority");
    const status: HTMLSelectElement | null = task.querySelector(".status");
    if (priority)
      priority.removeEventListener("change", changePriorityAndStatus);
    if (status) status.removeEventListener("change", changePriorityAndStatus);
    span.removeEventListener("click", deleteTask);
    taskManager.removeTask(task.id);
  } catch (error) {
    console.error(error instanceof DeleteError ? error.message : error);
  }

  updateUIAndStorage(taskManager.tasks);
}

function updateUIAndStorage(
  tasks: Map<string, Tasks.Description>
) {
  clearUI();
  addTaskToUI(tasks);
  updateStorage(tasks);
}

document.addEventListener("DOMContentLoaded", loadingActions);
try {
  if (!elements.forms.hp || !elements.forms.lp)
    throw new EventListenerError(ERRORS.EVENT_LISTENER_ERROR_MESSAGE);
  elements.forms.hp.addEventListener("submit", handlerTask);
  elements.forms.lp.addEventListener("submit", handlerTask);
} catch (error) {
  console.error(error instanceof EventListenerError ? error.message : error);
}
