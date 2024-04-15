"use strict";
import { Tasks } from "./manager";
import { CreateElementError, ERRORS } from "./errors";

namespace Elements {
  export interface Block {
    div: HTMLDivElement;
    selectPriority: HTMLSelectElement;
    optionHigh: HTMLOptionElement;
    optionLow: HTMLOptionElement;
    selectStatus: HTMLSelectElement;
    optionToDo: HTMLOptionElement;
    optionInProgress: HTMLOptionElement;
    optionDone: HTMLOptionElement;
    span: HTMLSpanElement;
    content: string;
    id: string;
  }

  export type Attributes = {
    [attribute: string]: string;
  };

  export interface AttributesAndContent {
    element: HTMLElement;
    attributes: Attributes;
    content?: string;
  }

  export interface AllItems {
    id: string;
    content: string;
    priority: string;
    status: string;
  }
}

const elements = {
  sections: {
    hp: document.querySelector("#high-priority") as HTMLElement | null,
    lp: document.querySelector("#low-priority") as HTMLElement | null,
  },

  forms: {
    hp: document.querySelector("#hp-form") as HTMLFormElement | null,
    lp: document.querySelector("#lp-form") as HTMLFormElement | null,
  },

  inputs: {
    hp: document.querySelector("#hp-input") as HTMLInputElement | null,
    lp: document.querySelector("#lp-input") as HTMLInputElement | null,
  },

  errorOutput: document.querySelector("#error-output") as HTMLDivElement | null,
};

const clearUI = () =>
  document
    .querySelectorAll(".task-wrapper")
    .forEach((element) => element.remove());

const updateStorage = (tasks: Map<string, Tasks.Description>) =>
  localStorage.setItem("currentTasks", JSON.stringify([...tasks]));

const setAttributesAndContent = (
  value: Elements.AttributesAndContent
) => {
  Object.keys(value.attributes).forEach((key) =>
    value.element.setAttribute(key, value.attributes[key])
  );
  if (value.content) value.element.textContent = value.content;
};

function buildBlockOfElements(block: Elements.Block) {
  setAttributesAndContent({
    element: block.div,
    attributes: { class: "task-wrapper", id: block.id },
    content: block.content,
  });
  setAttributesAndContent({
    element: block.selectPriority,
    attributes: { class: "priority" },
  });
  setAttributesAndContent({
    element: block.optionHigh,
    attributes: { value: "HIGH" },
    content: "HIGH",
  });
  setAttributesAndContent({
    element: block.optionLow,
    attributes: { value: "LOW" },
    content: "LOW",
  });
  setAttributesAndContent({
    element: block.selectStatus,
    attributes: { class: "status" },
  });
  setAttributesAndContent({
    element: block.optionToDo,
    attributes: { value: "TO DO" },
    content: "TO DO",
  });
  setAttributesAndContent({
    element: block.optionInProgress,
    attributes: { value: "IN PROGRESS" },
    content: "IN PROGRESS",
  });
  setAttributesAndContent({
    element: block.optionDone,
    attributes: { value: "DONE" },
    content: "DONE",
  });
  setAttributesAndContent({
    element: block.span,
    attributes: { class: "lnr lnr-cross" },
  });

  block.div.append(block.selectPriority, block.selectStatus, block.span);
  block.selectPriority.append(block.optionHigh, block.optionLow);
  block.selectStatus.append(
    block.optionToDo,
    block.optionInProgress,
    block.optionDone
  );

  return block.div;
}

function createStructureOfTask(
  items: Elements.AllItems
) {
  const {id, content, priority, status} = items;
  const div = document.createElement("div");
  const selectPriority = document.createElement("select");
  const optionHigh = document.createElement("option");
  const optionLow = document.createElement("option");
  const selectStatus = document.createElement("select");
  const optionToDo = document.createElement("option");
  const optionInProgress = document.createElement("option");
  const optionDone = document.createElement("option");
  const span = document.createElement("span");

  const structureOfTask = buildBlockOfElements({
    div,
    selectPriority,
    optionHigh,
    optionLow,
    selectStatus,
    optionToDo,
    optionInProgress,
    optionDone,
    span,
    content,
    id,
  });
  try {
    const priorityOption = structureOfTask.querySelector(
      ".priority"
    ) as HTMLSelectElement;
    const statusOption = structureOfTask.querySelector(
      ".status"
    ) as HTMLSelectElement;
    if (!priorityOption || !statusOption)
      throw new CreateElementError(ERRORS.CREATE_ELEMENT_ERROR_MESSAGE);
    priorityOption.value = priority;
    statusOption.value = status;
    return structureOfTask;
  } catch (error) {
    console.error(error instanceof CreateElementError ? error.message : error);
    return null;
  }
}

export { elements, clearUI, updateStorage, createStructureOfTask };
