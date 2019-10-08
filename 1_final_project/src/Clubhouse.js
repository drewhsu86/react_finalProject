import React, { Component } from 'react';
import firebase from 'firebase';
import { Link, NavLink } from 'react-router-dom';
import Nav from './header/Nav'
import Firebase, { config, auth, provider } from './Firebase';
import DialogueBubble from './DialogueBubble';
import FrontScreen from './components/FrontScreen';
import APODAPI from './components/APODAPI';
import NewsAPI from './components/NewsAPI';



class Clubhouse extends Component {

  state = {
    objChan: [
      `Hi, I'm Object-chan!`,
      `Welcome to our clubhouse!`,
      `We help each other learn Javascript and APIs here!`,
      `We also like to relax and hang out.`,
      `Check out our telescope! You can look at images of space!`
    ],
    objIndex: 0,
    arrayKun: [
      `Hi, I'm Array-kun.`,
      `Is Object-chan bothering you? Let me know.`,
      `I always help her set up her APIs.`,
      `But she works very hard, so I don't mind.`,
      `Feel free to use our laptop. You can browse the news.`
    ],
    arrayIndex: 0,
    APODscreen: 'false',
    NewsScreen: 'false',
  };

handleChange = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  })
}

clickConsole = (e) => {
  console.log(e);
}

clickObjChan = (e) => {
  console.log('ObjectChan');
  let newIndex = 0;

  if (this.state.objIndex < this.state.objChan.length-1) {
    newIndex = this.state.objIndex + 1;
  }

  this.setState({
    objIndex: newIndex
  });
}

clickArrayKun = (e) => {
  console.log('clickArrayKun');
  let newIndex = 0;

  if (this.state.arrayIndex < this.state.arrayKun.length-1) {
    newIndex = this.state.arrayIndex + 1;
  }

  this.setState({
    arrayIndex: newIndex
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
        <img src={require('./images/clubhouse1.png')} className="imgPiece"/>

        <DialogueBubble
        triangleRight
        top="600px"
        left="150px"
        width="250px"
        height="auto"
        msg={this.state.arrayKun[this.state.arrayIndex]}
        clickFunct={this.clickArrayKun}
        shiftTriangle="0"
        />

        <DialogueBubble
        triangle
        top="180px"
        left="100px"
        width="200px"
        height="auto"
        bgColor=" "
        msg={this.state.objChan[this.state.objIndex]}
        clickFunct={this.clickObjChan}

        />

        <DialogueBubble
        triangle
        top="280px"
        left="375px"
        width="150px"
        height="auto"
        bgColor=" "
        msg="Check out some news! Click here!"
        clickFunct={(e) => this.enterFrontScreen('NewsScreen')}

        />

        <DialogueBubble
        triangle
        top="180px"
        left="725px"
        width="200px"
        height="auto"
        bgColor=" "
        msg="Look at a photo of space! Click here!"
        clickFunct={(e) => this.enterFrontScreen('APODscreen')}

        />

        <Link to="/blackjack">
        <DialogueBubble
        triangleRight
        top="470px"
        left="110px"
        width="150px"
        height="auto"
        msg="Play Blackjack with us!"

        />
        </Link>


        </div>

        <FrontScreen content={<APODAPI />} visible={this.state.APODscreen} width="800px" height="auto"
        exit={(e) => this.exitFrontScreen('APODscreen')}
          />

        <FrontScreen content={<NewsAPI />} visible={this.state.NewsScreen} width="800px" height="auto"
        exit={(e) => this.exitFrontScreen('NewsScreen')}
          />

      </div>

      </div>
    );
  }
}

export default Clubhouse;
