import './App.css';
//import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const tasks = [
  {
    id: 1,
    content: 'Create MERN App',
    date: '2020-02-03',
    important: true
  },
  {
    id: 2,
    content: 'Test App',
    date: '2020-02-03',
    important: false
  }
]

const subtasks = [
  {
    id: 1,
    content: 'Build Frontend',
    mainTask: 1
  },
  {
    id: 2,
    content: 'Build Backend',
    mainTask: 1
  },
  {
    id: 3,
    content: 'Learn about Unit Tests',
    mainTask: 2
  },
  {
    id: 4,
    content: 'Try put Cypress.io',
    mainTask: 2
  }
]

const Task = () => {
  return (
    tasks.map(task => <li key={task.id}>{task.content}</li>)
  )
}

const Subtask = () => {
  return (
  subtasks.map(subtask => <li key={subtask.id}>{subtask.content}</li>)
  )
}

const App = () => {

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        <Task />
      </ul>
    </div>
  )
}

export default App;
