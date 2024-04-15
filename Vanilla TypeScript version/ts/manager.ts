"use strict";
const DEFAULT: string = "TO DO";

namespace Tasks {
  export interface Description {
    name: string;
    priority: string;
    status: string;
  }
  export type Nested = [id: string, Description];
  export type Current = Nested[];
}

class Task implements Tasks.Description {
  name: string;
  priority: string;
  status: string;

  constructor(name: string, priority: string, status: string) {
    this.name = name;
    this.priority = priority;
    this.status = status;
  }
}

class TaskManager {
  tasks: Map<string, Tasks.Description>;
  constructor() {
    this.tasks = new Map<string, Tasks.Description>();
  }

  addTask(
    id: string,
    name: string,
    priority: string,
    status: string = DEFAULT
  ) {
    const task = new Task(name, priority, status);
    this.tasks.set(id, task);
  }

  removeTask(id: string) {
    this.tasks.delete(id);
  }
}

export { Tasks, TaskManager }