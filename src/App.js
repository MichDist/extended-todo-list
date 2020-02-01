import './App.css';
//import ReactDOM from 'react-dom'
import React, { useState } from 'react'


const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    console.log('clicked');
  }

  return (
    <div>
      {counter}
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}

export default App;
