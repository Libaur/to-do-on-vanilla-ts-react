"use strict";
import { Tasks } from "./manager";

const ERRORS = {
  SHORT_DESCRIPTION_ERROR_MESSAGE: "Пожалуйста, добавьте информативности",
  LONG_DESCRIPTION_ERROR_MESSAGE: "Пожалуйста, опишите задачу лаконичнее",
  HANDLER_TASK_ERROR_MESSAGE: "Не удалось обработать новую задачу",
  RENDER_ERROR_MESSAGE: "Не удалось обновить интерфейс",
  DELETE_ERROR_MESSAGE: "Не удалось удалить задачу",
  EVENT_LISTENER_ERROR_MESSAGE: "Форма не может обработать событие",
  CREATE_ELEMENT_ERROR_MESSAGE: "Элемент не может получить опции",
  OBTAIN_ERROR_MESSAGE: "Сохраненные задачи не были получены"
};

class HandlerTaskError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HandlerTaskError";
  }
}

class EventListenerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventListenerError";
  }
}

class RenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RenderError";
  }
}

class CreateElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateElementError";
  }
}

class DeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeleteError";
  }
}

class ShortDescriptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShortDescriptionError";
  }
}

class LongDescriptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LongDescriptionError";
  }
}

class ObtainCurrentTasksError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ObtainCurrentTasksError";
  }
}

const checkTaskValidation = (name: string) => {
  if (name.length < 3) {
    throw new ShortDescriptionError(ERRORS.SHORT_DESCRIPTION_ERROR_MESSAGE);
  } else if (name.length > 25) {
    throw new LongDescriptionError(ERRORS.LONG_DESCRIPTION_ERROR_MESSAGE);
  }
};

const checkObtainFromStorage = (): Tasks.Current | null => {
  try {
    const currentTasks = JSON.parse(localStorage.getItem("currentTasks") || "");
    if (!currentTasks)
      throw new ObtainCurrentTasksError(ERRORS.OBTAIN_ERROR_MESSAGE);
    return currentTasks;
  } catch (error) {
    console.error(error instanceof ObtainCurrentTasksError ? error.message : "");
    return null;
  }
};

export {
  checkTaskValidation,
  checkObtainFromStorage,
  ShortDescriptionError,
  LongDescriptionError,
  HandlerTaskError,
  RenderError,
  CreateElementError,
  DeleteError,
  EventListenerError,
  ERRORS
};
