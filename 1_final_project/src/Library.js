import React, { Component } from 'react';
import firebase from 'firebase';
import Nav from './header/Nav'
import Firebase, { config, auth, provider } from './Firebase';
import DialogueBubble from './DialogueBubble';
import FrontScreen from './components/FrontScreen';
import JSONQuiz from './components/JSONQuiz';
import JSQuiz from './components/JSQuiz';


class Library extends Component {

  state = {
    stringSensei: [
      `Hi, I'm String-sensei! And that's Number-sensei.`,
      `Welcome to library! Do you need any help with Javascript?`,
      `You can try the JSON object test on our computer.`,
      `Or you can get quizzed by myself and Number-sensei.`,
    ],
    strIndex: 0,
    JSONscreen: 'false',
    JSqscreen: 'false',

  };

handleChange = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  })
}

clickConsole = (e) => {
  console.log(e);
}

clickStringSensei = (e) => {
  let newIndex = 0;

  if (this.state.strIndex < this.state.stringSensei.length-1) {
    newIndex = this.state.strIndex + 1;
  }

  this.setState({
    strIndex: newIndex
  });
}

exitFrontScreen = (fsID) => {
  console.log('exitFrontScreen');
  this.setState({
    [fsID]: 'false'
  });
}

enterFrontScreen = (fsID) => {
  console.log('enterFrontScreen');
  this.setState({
    [fsID]: 'true'
  });
}




  componentDidMount() {


    } // end componentDidMount


  render() {

    return (

      <div className="App">
      <header className="App-header">
        <Nav />
      </header>

      <div className="main-container center">



        <div className="imgHolder">
        <img src={require('./images/library1.png')} className="imgPiece"/>


        <DialogueBubble
        triangleRight
        top="300px"
        left="100px"
        width="200px"
        height="auto"
        bgColor=" "
        msg={this.state.stringSensei[this.state.strIndex]}
        clickFunct={this.clickStringSensei}

        />

        <DialogueBubble
        triangle
        top="350px"
        left="550px"
        width="150px"
        height="auto"
        bgColor=" "
        msg="Try the JSON Object Test! Click here!"
        clickFunct={(e) => this.enterFrontScreen('JSONscreen')}

        />

        <DialogueBubble
        triangle
        top="230px"
        left="775px"
        width="200px"
        height="auto"
        bgColor=" "
        msg="Want to take a short quiz with String-sensei and me? Click here!"
        clickFunct={(e) => this.enterFrontScreen('JSqscreen')}

        />

        </div>

        <FrontScreen content={<JSONQuiz />} visible={this.state.JSONscreen} width="1000px" height="auto"
        exit={(e) => this.exitFrontScreen('JSONscreen')}
          />

        <FrontScreen content={<JSQuiz />} visible={this.state.JSqscreen} width="800px" height="auto"
        exit={(e) => this.exitFrontScreen('JSqscreen')}
          />

      </div>
      </div>
    );
  }
}

export default Library;
