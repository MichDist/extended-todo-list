import './App.css';
//import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({eventHandler, label}) => {
  return (
    <div>
      <button onClick={eventHandler}>
        {label}
      </button>
    </div>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    console.log('clicked');
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button eventHandler={handleClick} label='plus'/>
      <Button eventHandler={ () => setCounter(0)} label='reset'/>
    </div>
  )
}

export default App;
