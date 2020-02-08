import React from 'react';
import Subtask from './Subtask';

const Task = ({tasks}) => {
    return (
      tasks.map(task => <li key={task.id}>{task.content} 
       
      <ul>{<Subtask task={task} />}</ul>
      
      </li>)
    )
  }

  export default Task;