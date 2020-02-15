import './App.css';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Task from './components/Task'
import taskService from './services/tasks'
import Notification from './components/Notification'

// TODO
// ALTER tasks
// CREATE SUBTASKS + DELETE + UPDATE

const App = () => {
  // State Hooks
  const [tasksState, setTasksState] = useState([])
  const [newTask, setNewTask] = useState('Some new task')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [updatedTask, setUpdatedTask] = useState('')


  useEffect(() => {                           // useEffect(hook, [])
    taskService
      .getAll()
      .then(initialTasks => {                     // Event Handler
        setTasksState(initialTasks)
      })
  }, [])

  // Adding new tasks
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

  // Search
  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  // Delete task
  const handleDelete = (id) => {
    taskService
      .remove(id)
      .then(() => {
        const newTasks = tasksState.filter(task => task.id !== id)
        setTasksState(newTasks)
      })
  }

  // Update a task
  const updateTask = (id, content) => {
    //event.preventDefault()
    const task = tasksState.find(n => n.id === id)
    const changedTask = {...task, content: updatedTask}

    taskService
      .update(id, changedTask)
      .then(returnedTask => {
        setTasksState(returnedTask)
      })
  }

  const handleUpdatedTask = (event) => {
    console.log(event.target.value)
    setUpdatedTask(event.target.value)
  }

  // Display tasks
  const tasksToShow = showAll
  // Show all and allow searching
  ? tasksState.filter(task => task.content.toLowerCase().includes(filter.toLowerCase())).map(task => 
    <Task task={task} toggleImportance={() => toggleImportanceOf(task.id)} onDelete={handleDelete} onUpdate={updateTask} updatedTask={updatedTask} handleUpdatedTask={handleUpdatedTask}/>)
  // Show only important and allow searching
  : tasksState.filter(task => task.content.toLowerCase().includes(filter.toLowerCase())).filter(task => task.important).map(task => 
    <Task task={task} toggleImportance={() => toggleImportanceOf(task.id)} onDelete={handleDelete} onUpdate={updateTask} updatedTask={updatedTask} handleUpdatedTask={handleUpdatedTask}/>)

  const showTasks = () => tasksToShow

  const toggleImportanceOf = id => {
    const task = tasksState.find(n => n.id === id)
    const changedTask = { ...task, important: !task.important}

  taskService
    .update(id, changedTask)
    .then(returnedTask => {
      setTasksState(returnedTask)
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
