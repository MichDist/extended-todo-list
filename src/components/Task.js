import React from 'react';
import Subtask from './Subtask';

const Task = ({task, toggleImportance, onDelete, onUpdate, updatedTask, handleUpdatedTask}) => {
    // Importance
    const label = task.important 
    ? 'make not important' : 'make important'

    // Confirm delete
    const handleConfirmDelete = (id, content) => {
        if(window.confirm(`Do you really want to delete the task "${content}"?`)) {
            onDelete(id)
        }
        else {return}
    }

    // Update 
    const handleOnUpdate = (id) => {
        onUpdate(id)
    }

    // Todo for later: Move Update in another component
    return (
        <li key={task.id}>{task.content}
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={() => handleConfirmDelete(task.id, task.content)}>Delete</button> 
        <form onSubmit={() => handleOnUpdate(task.id)}>
            <input           
            value={updatedTask}
            onChange={handleUpdatedTask}/>
            <button type="submit">Update task</button>
        </form>
        <ul>{<Subtask task={task} />}</ul>
        </li>
       )
  }

  export default Task;