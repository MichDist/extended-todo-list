import React from 'react';

const Subtask = ({task}) => {
if(task.subtasks !== undefined) {
  return (
    task.subtasks.map(subtask => <li key={subtask.id}>{subtask.content}</li>)
  )
}
else {
  return (null);
}
}

export default Subtask;
