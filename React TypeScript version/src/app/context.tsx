import React from 'react';
import { createContext, useContext, useReducer, Dispatch } from 'react';

export type Task = {
  id: string;
  text: string;
  checked: boolean;
};

type Add = Task & {
  type: 'add';
};

type Changed = {
  type: 'changed';
  task: Task;
};

type Checked = {
  type: 'checked';
  task: Task;
};

type Delete = {
  type: 'delete';
  id: string;
};

const tasks: Task[] = [];

const stateContext = createContext<Task[] | null | undefined>(null);
const dispatchContext = createContext<Dispatch<Add | Changed | Checked | Delete> | null>(null);

function reduser(draft: Task[], action: Add | Changed | Checked | Delete) {
  switch (action.type) {
    case 'add': {
      return [...draft, { id: action.id, text: action.text, checked: false }];
    }
    case 'changed': {
      const currentState = draft.map(task => (task.id === action.task.id ? action.task : task));
      return currentState;
    }
    case 'checked': {
      return action.task.checked
        ? [{ id: action.task.id, text: action.task.text, checked: true }, ...draft]
        : [...draft, { id: action.task.id, text: action.task.text, checked: false }];
    }
    case 'delete': {
      const currentState = draft.filter(task => task.id !== action.id);
      return currentState;
    }
    default:
      return draft;
  }
}

function TasksProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reduser, tasks);

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>{children}</dispatchContext.Provider>
    </stateContext.Provider>
  );
}

const useStateContext = () => useContext(stateContext);
const useDispatchContext = () => useContext(dispatchContext);

export { TasksProvider, useStateContext, useDispatchContext };
