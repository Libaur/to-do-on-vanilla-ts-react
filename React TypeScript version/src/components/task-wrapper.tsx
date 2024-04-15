import React, { useState } from 'react';
import { List } from '@mui/material';
import { Task } from '../app/context';
import { TaskItem } from './task-item';
import { useStateContext, useDispatchContext } from '../app/context';
import { isPatternPassed } from '../app/utils';

interface OrderedTasks {
  ГОТОВО: Task[];
  ПЛАН: Task[];
}

export function TaskWrapper() {
  const [error, setError] = useState(false);
  const tasks = useStateContext() ?? [];
  const dispatch = useDispatchContext();
  if (!tasks || !dispatch) console.error('context is null from TaskWrapper');

  const orderedTasks = tasks.reduce(
    (acc: OrderedTasks, task) => {
      const status = task.checked ? 'ГОТОВО' : 'ПЛАН';
      status === 'ГОТОВО' ? acc[status].unshift(task) : acc[status].push(task);
      return acc;
    },
    { ГОТОВО: [], ПЛАН: [] }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    task: Task
  ) => {
    const text = e.target.value;
    isPatternPassed(text) ? setError(false) : setError(true);
    dispatch?.({
      type: 'changed',
      task: { ...task, text: text },
    });
  };

  return Object.entries(orderedTasks).map(([status, tasks]) => (
    <List
      key={status}
      subheader={tasks.length ? `${status} (${tasks.length})` : ''}
      sx={{
        width: '100%',
        textAlign: 'center',
        color: 'GrayText',
        order: status === 'ПЛАН' ? 1 : 2,
      }}
    >
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          checked={task.checked}
          error={error}
          onChecked={e =>
            dispatch?.({
              type: 'changed',
              task: { ...task, checked: e.target.checked },
            })
          }
          onChange={e => handleChange(e, task)}
          onDelete={() =>
            dispatch?.({
              type: 'delete',
              id: task.id,
            })
          }
        />
      ))}
    </List>
  ));
}
