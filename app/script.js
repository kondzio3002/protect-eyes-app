import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  startTimer = () => {
    this.setState({ status: 'work', time: 1200 });
    this.state.timer = setInterval(() => {
      this.setState({ time: this.state.time - 1 })
      if(this.state.time === 0 && this.state.status === 'work') {
        this.playBell();
        this.setState({ status: 'rest', time: 21 });
        this.setState({ time: this.state.time - 1 });
      }
      if(this.state.time === 0 && this.state.status === 'rest') {
        this.playBell();
        this.setState({ status: 'work', time: 1201 });
        this.setState({ time: this.state.time - 1 });
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({ time: 0, status: 'off' });
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {

    const {status, time} = this.state;

    const formatTime = () => {
      return (
        <div>
          <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor(time % 60)).slice(-2)}</span>
        </div>
      )
    }

    return (
      <div>
        <h1>Protect your eyes</h1>
        { status === 'off' && 
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div> 
        }

        { status === 'work' && <img src="./images/work.png" />}
        { status === 'rest' && <img src="./images/rest.png" />}

        { status !== 'off' &&  
          <div className="timer">
            {formatTime()}
          </div> 
        }

        { status === 'off' && <button className="btn" onClick={this.startTimer}>Start</button>}
        { status !== 'off' && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
