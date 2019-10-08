import React, { Component } from 'react';
import Target from './Target';
import Nav from '../header/Nav'

class Clicker extends Component {

  state = {
    // set initial state of target
    randLeft: Math.round(Math.random()*1000),
    randTop: Math.round(Math.random()*600),

    // set initial state of score (clicker or shooter game)
    score: 0,
    startTime: 0,
  };

handleTargetClick = (e) => {
  console.log('handleTargetClick');

  let newScore = this.state.score + 1;
  // state state for position of target
  this.setState({
    randLeft: Math.round(Math.random()*1000),
    randTop: Math.round(Math.random()*600),
    score: newScore,
  })
}

secToTimeStr = (time) => {
  // convert seconds to hours, minutes, seconds
  // minute = 60 seconds
  // hours = 60 minutes = 3600 seconds

  let hours = Math.floor(time/3600);
  let minutes = Math.floor((time%3600)/60);
  let seconds = Math.floor(((time%3600)%60));

  if (minutes <= 9) {
    minutes = '0' + minutes;
  }

  if (seconds <= 9) {
    seconds = '0' + seconds;
  }

  return hours + ':' + minutes + ':' + seconds;
}

  componentDidMount() {


    // initialize timer
    setInterval( () => {


        let newTime = this.state.startTime + 1;
        this.setState({
          startTime: newTime
        })
    }, 1000);

  }

  render() {


    return (
      <div className="main-container">
        <header className="App-header">
          <Nav />
        </header>

        <h2>
        This is the main clicker div. <br/>
        Score: {this.state.score} <br />
        Time: {this.secToTimeStr(this.state.startTime)}
        </h2>

        <Target clicker={this.handleTargetClick} randLeft={this.state.randLeft}
        randTop={this.state.randTop} />

      </div>
    );
  }
}

export default Clicker;
