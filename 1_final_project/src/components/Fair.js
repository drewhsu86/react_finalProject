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
    visible: '',
    resetVisible: false,
    randomPeople: [],
    targetLoc: [0,0],
    helpUsText: 'Help us find Object-chan!',
    availablePeople: ['man1', 'woman1', 'child1'],
    diff: 30,
  };

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });

  } // end handleChange

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


initializeGame = () => {

  clearInterval(this.state.timer);
  // initialize timer
  let timer = setInterval( () => {


      let newTime = this.state.startTime + 1;
      this.setState({
        startTime: newTime
      })
  }, 1000);

  this.setState({
    timer,
    visible: true,
    startTime: 0,
    helpUsText: 'Help us find Object-chan!',
    resetVisible: false
  });

  this.randomizeBoard(100, 900, 200, 550, parseFloat(this.state.diff));

}

endGame = () => {
  console.log('Clicked endGame');
  // remove timer so that it doesn't keep going up
  clearInterval(this.state.timer);
  this.setState({
    helpUsText: 'You found her!',
    resetVisible: true,
  });
}

// let's make ALL THE PARAMETERS
  randomizeBoard = (spawnL, spawnR, spawnU, spawnD, numPeople) => {

    let listOfRandoms = [];

      for (let i = 0; i <= numPeople; i++) {

      let randX = spawnL + Math.round(Math.random()*(spawnR-spawnL));
      let randY = spawnU + Math.round(Math.random()*(spawnD-spawnU));

      // randomly select a civilian
      let randomPerson = this.state.availablePeople[Math.round(Math.random()*(this.state.availablePeople.length-1))];

      listOfRandoms.push([randX, randY, randomPerson]);

      }

      let targetLoc = listOfRandoms[0];
      listOfRandoms.shift();


      this.setState(
        {
        targetLoc,
        randomPeople: listOfRandoms,
        }
      );

  }


// the people will grow (be scaled up) as they get closer to the screen
// always linearly
// for now maxWidth happens if they reach the bottom of the screen
// minWidth happens at the bottom of the buildings, 350px
// delta Y/ delta X = (?%)/(450px)
// for every pixel the piece goes further down, it should increase by (?%)/450

  drawBoard = (maxWidth) => {

    // each drawing is 400x300 and the board is 1000x800
    // for starters the building line should be ~400 +/- 50 px => let's leave it at 400px
    // horizontally, one building should always be in the first half and the other in the second half
    // so my left value for the buildings will be 50 and 550 (having it not be random is fine)

    let targetLoc = this.state.targetLoc;
    let randomPeople = this.state.randomPeople;


    return (

      <div className="imgHolder" style={{width:"1000px", height:"800px", backgroundColor: "white",
      margin: "0 10%"
      }}>

        <img src={require(`../images/findgame/park1.png`)} style={{position: "absolute",
        left: "50px", top:"50px", zIndex: `${50}`
        }}/>

        <img src={require(`../images/findgame/tent1.png`)} style={{position: "absolute",
        left: "550px", top:"50px", zIndex: `${50}`
        }}/>

        <img src={require(`../images/findgame/findObjChan.png`)} style={{position: "absolute",
        left: `${targetLoc[0]}px`, top:`${targetLoc[1]}px`, zIndex: `${targetLoc[1]}`,
        width: `${100 + (maxWidth-1)/450}px`, height: "auto"
        }}
        onClick={this.endGame}
        />

        {
          randomPeople.map((coord) => {

            return (

              <img src={require(`../images/findgame/${coord[2]}.png`)} style={{position: "absolute",
              left: `${coord[0]}px`, top:`${coord[1]}px`, zIndex: `${coord[1]}`,
              width: `${100 + (maxWidth-1)/450}px`, height: "auto",
              pointerEvents: "none", filter: `hue-rotate(${(coord[0]*coord[1])%360}deg)`
              }}/>

            )

          })
        }

      </div>

  )
} // end drawBoard




  componentDidMount() {




  }

  render() {


    return (
      <div className="main-container">
        <header className="App-header">
          <Nav />
        </header>

        <h2 className="textBox" style={{width:"auto"}}>
        We were supposed to meet at the fair, but Object-chan's phone is off! <br/>
        Difficulty (Positive Integer) <input onChange={this.handleChange} name="diff" value={this.state.diff} type="text" />
        <br/>
        <img src={require(`../images/findgame/findObjChan.png`)} />
        {this.state.helpUsText} <button onClick={this.initializeGame}> Okay! </button>
        <br/>
        Time: {this.secToTimeStr(this.state.startTime)}
        </h2>


        <div style={{display: `${this.state.visible ? "block" : "none"}`}}>
            {this.drawBoard(1.5)}
            <div className="textBox">
              <button onClick={this.initializeGame}
                style={{position: "fixed", left: "40%", top: "40%", width: "20%", height: "20%",
                display: `${this.state.resetVisible ? "block" : "none"}`, fontSize: "30px"
              }}> You did it! Reset? <br/>
              Your time: {this.secToTimeStr(this.state.startTime)}
              </button>
            </div>
        </div>


      </div>
    );
  }
}

export default Clicker;
