import './App.css';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Task from './components/Task'
import taskService from './services/tasks'
import Notification from './components/Notification'

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
    important: false

  }
]

const App = () => {
  // State Hooks
  const [tasksState, setTasksState] = useState([])
  const [newTask, setNewTask] = useState('Some new task')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {                           // useEffect(hook, [])
    taskService
      .getAll()
      .then(initialTasks => {                     // Event Handler
        setTasksState(initialTasks)
      })
  }, [])

  const addTask = (event) => {
    event.preventDefault();
    const newTaskObject = {
      content: newTask,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    taskService
      .create(newTaskObject)
      .then(returnedTask => {
        setTasksState(tasksState.concat(returnedTask))
        setNewTask('')
      })
    }

  const handleNewTask = (event) => {
    console.log(event.target.value)
    setNewTask(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const tasksToShow = showAll
  // Show all and allow searching
  ? tasksState.filter(task => task.content.toLowerCase().includes(filter.toLowerCase())).map(task => <Task task={task} toggleImportance={() => toggleImportanceOf(task.id)}/>)
  // Show only important and allow searching
  : tasksState.filter(task => task.content.toLowerCase().includes(filter.toLowerCase())).filter(task => task.important).map(task => <Task task={task} toggleImportance={() => toggleImportanceOf(task.id)}/>)

  const showTasks = () => tasksToShow

  const toggleImportanceOf = id => {
    const task = tasksState.find(n => n.id === id)
    const changedTask = { ...task, important: !task.important}

  taskService
    .update(id, changedTask)
    .then(returnedTask => {
      setTasksState(tasksState.map(task => task.id !== id ? task : returnedTask))
    })
    // Catch error when user tries to make a non existing task (not) important
    .catch(error => {
      setErrorMessage(
        `The Task '${task.content}' is not on the server!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // Filter the taks out from state
      setTasksState(tasksState.filter(n => n.id !== id))
    })
  }

  return (
    <div className='App'>
      <h1>Tasks</h1>
      <Notification message={errorMessage} />
      <ul>
        {showTasks()}
      </ul>
      <form onSubmit={addTask}>
        <input 
          value={newTask}
          onChange={handleNewTask}/>
        <button type="submit">Save new task</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'only important tasks' : 'all tasks'}
        </button>
      </div>
        {/* Search */}        
      <div>
        <input 
        onChange={handleSearch}/> 
      </div>
    </div>
    )
  }


export default App;
