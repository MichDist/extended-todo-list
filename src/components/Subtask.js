import React from 'react';

const Subtask = ({task}) => {
  return (
    task.subtasks.map(subtask => <li className='subtask' key={subtask.id}>{subtask.content}</li>)
  )
}

export default Subtask;