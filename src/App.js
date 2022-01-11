import React from 'react'
import './App.css';
import Router from './Router/Router';

function App(props) {
  console.log("App.js")
  return (
    <div className="App">
      <Router></Router>
    </div>
  );
}

export default App;
