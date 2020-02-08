import './App.css';
//import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Task from './components/Task';

const tasks = [
  {
    id: 1,
    content: 'Create MERN App',
    date: '2020-02-03',
    important: true,
    subtasks: [
      {
        id: 1,
        content: 'Build Frontend',
        mainTask: 1
      },
      {
        id: 2,
        content: 'Build Backend',
        mainTask: 1
      }
    ]
  },
  {
    id: 2,
    content: 'Test App',
    date: '2020-02-03',
    important: false,
    subtasks: [
      {
        id: 3,
        content: 'Learn about Unit Tests',
        mainTask: 2
      },
      {
        id: 4,
        content: 'Try out Cypress.io',
        mainTask: 2
      }
    ]
  },
  {
    id: 3,
    content: 'Task without Subtasks',
    date: '2020-02-07',
    important: false,
    Subtasks: null
  }
]

const App = () => {
  const [tasksState, setTasksState] = useState(tasks);
  const [newTask, setNewTask] = useState('Some new task');

  const addTask = (event) => {
    event.preventDefault();
    const newTaskObject = {
      id: tasks.length + 1,
      content: newTask,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    setTasksState(tasks.concat(newTaskObject));
    setNewTask('Some new Task');
  }

  const handleNewTask = (event) => {
    console.log(event.target.value);
    setNewTask(event.target.value);
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        <Task tasks={tasksState}/>
      </ul>
      <form onSubmit={addTask}>
        <input 
          value={newTask}
          onChange={handleNewTask}/>
        <button type="submit">Save new task</button>
      </form>
    </div>
  )
}

export default App;
