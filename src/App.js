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
    important: false

  }
]

const App = () => {
  const [tasksState, setTasksState] = useState(tasks)
  const [newTask, setNewTask] = useState('Some new task')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  const addTask = (event) => {
    event.preventDefault();
    const newTaskObject = {
      id: tasksState.length + 1,
      content: newTask,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
      
    }

    setTasksState(tasksState.concat(newTaskObject));
    setNewTask('Some new Task');
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
    ? <Task tasks={tasksState} filter={filter}/>
    : <Task tasks={tasksState.filter(task => task.important)} filter={filter} />

  const showTasks = () => tasksToShow

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
