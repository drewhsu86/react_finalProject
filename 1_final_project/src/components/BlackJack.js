import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class BlackJack extends Component {

  state = {

    deck: [],
    yourHand: [],
    player2Hand: [],
    dealerHand: [],
    turn: 1,
    player2But: 'true',
    dealerBut: 'true',

  };

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  // random article from API returned list of Articles
  // response.articles[index of article]
  initializeGame= () => {

    // make 52 cards
    // 2 character strings:
    // A, 2-9, T, J, Q, K (card value)
    // C, H, S, D (card suit)

    let cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    let cardSuit = ['C', 'H', 'S', 'D'];

    let newDeck = [];

    for (let val of cardValue) {
      for (let suit of cardSuit) {
        let thisCard = val + suit;
        newDeck.push(thisCard);
      }
    } // end nested for (val and suit)

    // randomize deck (shuffle)
    // fisher yates shuffle

    console.log(newDeck);

    newDeck = this.fisherYates(newDeck);

    console.log(newDeck);

    // deal 2 cards to each player

    let hands = [[],[],[]];

    for (let i = 0; i <= 1; i++) {

        for (let j = 0; j <= 2; j++) {

          hands[j].push(newDeck[0]); // always take the first card from deck
          newDeck.shift();  // remove card from newDeck

        }

    } // end for loop, deal 2 cards to 3 players

    console.log(hands);

    this.setState({
      deck: newDeck,
      turn: 1,
      yourHand: hands[0],
      player2Hand: hands[1],
      dealerHand: hands[2],
      player2But: 'true',
      dealerBut: 'true',
    });

    console.log(newDeck);

  } // end initializeGame


  // fisher-yates shuffle
  // put all elements in a hat
  // draw from the hat randomly until empty
  // input: array
  // output: array

  fisherYates = (unshufArray) => {

    let totalTimes = unshufArray.length - 1;
    let hat = unshufArray;
    let newArray = [];

    for (let i = 0; i <= totalTimes; i ++) {

      let randomIndex = Math.round(Math.random()*(hat.length-1));
      let chosen = hat.splice(randomIndex,1);
      // console.log(hat.length + ', ' + i);
      newArray.push(chosen[0]);

    }

    return newArray;

  }


  // calculate blackjack hand score
  // aces either 1 or 11 (maximum legal score taken as actual score)
  // T-K as 10
  // numbered cards as their number
  // input: array of cards (2 char strings)
  // output: a number
  // bust: -1
  // blackjack not counted as better than normal 21
  // no rule for 5 cards or over
  // no rule for split or other additional rules

  maximumLegalScore = (hand) => {

    let yourScore = 0;
    let aces = 0;

    for (let card of hand) {

      let cardValue = card[0];
      if (typeof(parseFloat(cardValue)) === "number" && !isNaN(parseFloat(cardValue))) {
        yourScore += parseFloat(cardValue);
      } else if (cardValue === "A") {
        aces ++;
        yourScore += 11;
      } else {
        yourScore += 10;
      }

    } // end for card of hand

    while (yourScore > 21 && aces > 0) {
      yourScore -= 10;
      aces --;
    }

    if (yourScore > 21) {
      yourScore = -1;
    }

    return yourScore;

  } // end maximumLegalScore


// turn card string into a div with an image
  cardImage = (card, player) => {

    let cardValue = card[0];
    let cardSuit = card[1];


    let imgValue = () => {return (
      <div> 123 </div>
    )};

    console.log('cardValue: ' + cardValue);

    if (player === 1 || player <= this.state.turn) {
      return (
        <div className="bjCard">



          {
            typeof(parseFloat(cardValue)) === "number" && !isNaN(parseFloat(cardValue)) ?
            <div className="cardNum">
            <br/>
            {cardValue}
            </div>
            :

              cardValue === "T" ?
              <div className="cardNum">
              <br/>
              10
              </div>
              :
              <img src={require(`../images/cards/${cardValue}.png`)} width="74px" height="auto"/>

          }

          <img src={require(`../images/cards/${cardSuit}.png`)} width="45px" height="auto"/>


        </div>
      )
    } // if show cards
    else {
      return (
        <div className="bjCard">
        <img src={require(`../images/cards/cardback.png`)} width="100%" height="auto"/>
        </div>
      )
    }


  } /// end cardImage

  // hit a card to a hand (written as a string not an array)
  buttonHit = (whoseHand) => {

    let newHand = this.state[whoseHand];
    let newDeck = this.state.deck;

    newHand.push(newDeck[0]); // always take the first card from deck
    newDeck.shift();  // remove card from newDeck

    this.setState({
      deck: newDeck,
      [whoseHand]: newHand,
    });



  }

  buttonYouHit = () => {
    this.buttonHit('yourHand');
    // if the hit causes you to bust, go to next turn
    if (this.maximumLegalScore(this.state.yourHand) < 0) {
      this.buttonYouStay();
    }
  }

  buttonStay = () => {

    let newTurn = this.state.turn+1;
    this.setState({
      turn: newTurn
    });

  }

  buttonYouStay = () => {

    this.buttonStay();

    this.player2Turn();

  }

// player 2 turn will hit until bust
  player2Turn = () => {

    console.log('player2Turn');

    // this player will have a random threshold of when not to hit
    let threshold = 16 + Math.round(Math.random()*2);
    let currentScore = this.maximumLegalScore(this.state.player2Hand);


      // add delay to make it look like decisions were made
      let keepHitting = setInterval(() => {

        currentScore = this.maximumLegalScore(this.state.player2Hand);

        // threshold to stay not hit anymore
        if (currentScore < 0 || currentScore >= threshold)  {
          clearInterval(keepHitting);

          this.setState({
            player2But: '',
          })


        } else {
          this.buttonHit('player2Hand');
        }

      }, 1000);

  } // player2Turn end

  player2But = () => {
    this.buttonStay();
    this.dealerTurn();
  }

  dealerTurn = () => {
    console.log('dealerTurn');

    // this player will have a threshold of when not to hit
    let threshold = 17;
    let currentScore = this.maximumLegalScore(this.state.dealerHand);


      // add delay to make it look like decisions were made
      let keepHitting = setInterval(() => {

        currentScore = this.maximumLegalScore(this.state.dealerHand);

        // threshold to stay not hit anyomre
        if (currentScore < 0 || currentScore >= threshold)  {
          clearInterval(keepHitting);

          this.setState({
            dealerBut: '',
          })


        } else {
          this.buttonHit('dealerHand');
        }

      }, 1000);
  }

  scoreGame = () => {

    this.buttonStay();

  }

  componentDidMount() {

    // random date string format: date=YYYY-MM-DD
    // Start date June 16, 1995
    //


    this.initializeGame();

  } // end componentDidMount

  render() {

    let yourCards = this.state.yourHand.map((card) => {
     return (
       this.cardImage(card, 1)
     )
    });

    let player2Cards = this.state.player2Hand.map((card) => {
     return (
       this.cardImage(card, 2)
     )
    });

    let dealerCards = this.state.dealerHand.map((card) => {
     return (
       this.cardImage(card, 3)
     )
    });

    return (


      <div className="blackjackTable">

        <div className="inlineB">


        <h2>
          <img src={require(`../images/cards/charArrayKun.png`)} width="100px"
          style={{borderRadius: "50px", border: "5px solid white"}} className="inlineB"
          />
          &nbsp; This is the dealer's hand:
          </h2>
        <h4>
          {dealerCards} <br/>
          {
            this.state.turn < 3
            ?
            '???'
            :
            this.maximumLegalScore(this.state.dealerHand)} points
        </h4>


        </div>

        <div style={{position: "absolute", width: "400px", right:"5%", top:"5%"}}>
        <h2> Rules: </h2>
        <h4>

          Simple Rules: Go up to but not over 21 <br/>
          No split, no bets <br/>
          Dealer hits on 16, stays on 17
          <br/>
          <br/>
          <button onClick={this.initializeGame}> Reset </button> <br/> <br/>
          <Link to="/clubhouse"> <button> Go back to Clubhouse </button> </Link>

        </h4>
        </div>


        <div style={{position: "relative", display: "block", height: "200px", padding: "50px"}}>

          <div style={{position: "relative", bottom: "10px"}}>

          {this.state.turn === 1 ?
            <div>
            <h2> Your turn! </h2>
            <button onClick={this.buttonYouHit}> Hit </button> &nbsp;
            <button onClick={this.buttonYouStay}> Stay </button>
            </div>
            :
            null
          }
          {
            this.state.turn === 2 ?
            <div>
            <h2> Player 2's Turn </h2>
            <button disabled={this.state.player2But} onClick={this.player2But}> End Player 2's Turn </button>
            </div>
            :
            null
          }
          {
            this.state.turn === 3 ?
            <div>
            <h2> Dealer's Turn </h2>
            <button disabled={this.state.dealerBut} onClick={this.scoreGame}> End Dealer's Turn </button>
            </div>
            :
            null
          }
          {
            this.state.turn === 4 ?
            <div>
            <h4> <b>
            Scoreboard:
            </b> </h4> 
            <h4>
            You: {this.maximumLegalScore(this.state.yourHand)} <br/>
            Player 2: {this.maximumLegalScore(this.state.player2Hand)} <br/>
            Dealer: {this.maximumLegalScore(this.state.dealerHand)} <br/>
            <button onClick={this.initializeGame}> Reset </button>
            </h4>

            </div>
            :
            null
          }

          </div>

        </div>


        <div className="inlineB">
        <h2>
          <div
          style={{width: "100px", height: "100px", borderRadius: "50px", border: "5px solid white", backgroundColor: "darkgray", textAlign: "center", fontSize: "70px"}} className="inlineB"
          > ? </div>
          &nbsp;
        This is your hand:
        </h2>
        <h4>
          {yourCards} <br/>
          {this.maximumLegalScore(this.state.yourHand)} points
        </h4>
        </div>

        <div className="inlineB" style={{width: "20%"}}>
        </div>

        <div className="inlineB">
        <h2>
          <img src={require(`../images/cards/charObjChan.png`)} width="100px"
          style={{borderRadius: "50px", border: "5px solid white"}} className="inlineB"
          />
          &nbsp;
          This is player 2's hand:
        </h2>
        <h4>
          {player2Cards} <br/>
          { this.state.turn < 2
            ?
            '???'
            :
            this.maximumLegalScore(this.state.player2Hand) } points
        </h4>
        </div>



      </div>

    );
  }
}

export default BlackJack;
