import React from 'react';
import Subtask from './Subtask';

const Task = ({task, toggleImportance}) => {
    // Importance
    const label = task.important // FEHLER Es soll nur ein Element sein; Lösung tasks.map( über return)
    ? 'make not important' : 'make important'

    return (
        <li key={task.id}>{task.content}
        <button onClick={toggleImportance}>{label}</button>
        <ul>{<Subtask task={task} />}</ul>
        </li>
       )
  }

  export default Task;