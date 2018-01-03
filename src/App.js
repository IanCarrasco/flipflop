import React, { Component } from 'react';
import './App.css';
import Game from './components/Game/Game.js'
import logo from './assets/flipflop.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        <img className="logo" src={logo} alt="FlipFlop"></img>
      </div>
    );
  }
}

export default App;
