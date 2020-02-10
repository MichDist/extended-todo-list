import './App.css';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import axios from 'axios'

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


  useEffect(() => {                           // useEffect(hook, [])
    console.log('effect')
    axios
      .get('http://localhost:3001/tasks')
      .then(response => {                     // Event Handler
        console.log('promise fulfilled')
        setTasksState(response.data)
      })
  }, [])
  console.log('render ', tasksState.length, ' tasks')


  const addTask = (event) => {
    event.preventDefault();
    const newTaskObject = {
      content: newTask,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    axios
      .post('http://localhost:3001/tasks', newTaskObject)
      .then(response => {
        console.log(response)
        setTasksState(tasksState.concat(response.data))
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
    ? <Task tasks={tasksState} filter={filter} toggleImportance={() => toggleImportanceOf(tasksState.id)}/>
    : <Task tasks={tasksState.filter(task => task.important)} filter={filter} toggleImportance={() => toggleImportanceOf(tasksState.id)} />

  const showTasks = () => tasksToShow

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/tasks/${id}`
    const task = tasksState.find(n => n.id === id)
    const changedTask = { ...task, important: !task.important}

    axios.put(url, changedTask).then(response => {
      setTasksState(tasksState.map(task => task.id !== id ? task : response.data))
    })
  }

  return (
    <div className='App'>
      <h1>Tasks</h1>
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
