import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime = (time) => {
    let sec = (Math.floor(time % 60)).toString().padStart(2, '0');
    let min = (Math.floor(time / 60)).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step = () => {
    if (this.state.time === 0 && this.state.status === 'work') {
      this.playBell();
      this.setState({
        status: 'rest',
        time: 20,
      });
    } else if (this.state.time === 0 && this.state.status === 'rest') {
      this.playBell();
      this.setState({
        status: 'work',
        time: 20 * 60,
      });
    } else {
      this.setState({
        time: this.state.time - 1,
      });
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 20 * 60,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(this.state.timer),
    })
  };

  closeApp = () => {
    window.close();
  }


  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )

  }
};

render(<App />, document.querySelector('#app'));
