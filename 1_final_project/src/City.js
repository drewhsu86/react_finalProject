import React, { Component } from 'react';
import firebase from 'firebase';
// import Nav from './header/Nav'
import Firebase, { config, auth, provider } from './Firebase';
import DialogueBubble from './DialogueBubble';


class City extends Component {

  state = {
    objChan: [
      `Hi, I'm Object-chan!`,
      `Welcome to JSR-520 City!`,
      `Feel free to check out our clubhouse.`,
      `Or, you can customize your profile!`
    ],
    objIndex: 0
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
  let newIndex = 0;

  if (this.state.objIndex < this.state.objChan.length-1) {
    newIndex = this.state.objIndex + 1;
  }

  this.setState({
    objIndex: newIndex
  });
}






  componentDidMount() {


    } // end componentDidMount


  render() {

    return (
      <div className="main-container center">
        <div className="imgHolder">
        <img src={require('./images/city1.png')} className="imgPiece"/>

        <DialogueBubble
        triangle
        top="500px"
        left="150px"
        width="200px"
        height="auto"
        msg={this.state.objChan[this.state.objIndex]}
        clickFunct={this.clickObjChan}
        shiftTriangle="-25"
        />

        <DialogueBubble
        triangle
        top="250px"
        left="100px"
        width="200px"
        height="auto"
        bgColor=" "
        linkTxt="Profile!"
        linkLink="/profile"

        />

        <DialogueBubble
        triangle
        top="300px"
        left="375px"
        width="200px"
        height="auto"
        bgColor=" "
        linkTxt="Clubhouse!"
        linkLink="/clubhouse"

        />

        <DialogueBubble
        triangle
        top="300px"
        left="725px"
        width="200px"
        height="auto"
        bgColor=" "
        linkTxt="Library!"
        linkLink="/library"

        />

        <DialogueBubble
        triangle
        top="575px"
        left="725px"
        width="200px"
        height="auto"
        bgColor=" "
        linkTxt="The Fair!"
        linkLink="/fair"

        />

        </div>
      </div>
    );
  }
}

export default City;
