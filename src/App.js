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
  }
]

const App = () => {
  const [tasksState, setTasks] = useState(tasks);

  const addTask = (event) => {
    event.preventDefault();
    console.log('Button clicked', event.target);
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        <Task tasks={tasksState}/>
      </ul>
      <form onSubmit={addTask}>
        <input />
        <button type="submit">Save new task</button>
      </form>
    </div>
  )
}

export default App;
