import React from 'react';
import Subtask from './Subtask';

const Task = ({tasks, filter}) => {
  // Search function
  const filteredTasks = tasks.filter(task => task.content.toLowerCase().includes(filter.toLowerCase()))

    return (
      filteredTasks.map(task => <li key={task.id}>{task.content} 
       
      <ul>{<Subtask task={task} />}</ul>
      
      </li>)
    )
  }

  export default Task;