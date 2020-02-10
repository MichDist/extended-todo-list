import React from 'react';
import Subtask from './Subtask';

const Task = ({tasks, filter, toggleImportance}) => {
  // Search function
  const filteredTasks = tasks.filter(task => task.content.toLowerCase().includes(filter.toLowerCase()))

  // Importance
  const label = tasks.important // FEHLER
    ? 'make not important' : 'make important'

    return (
      filteredTasks.map(task => <li key={task.id}>{task.content} 
      <button onClick={toggleImportance}>{label}</button>

      <ul>{<Subtask task={task} />}</ul>
      
      </li>)
    )
  }

  export default Task;