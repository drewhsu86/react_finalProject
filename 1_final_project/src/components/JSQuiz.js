import React, { Component } from 'react';


class JSQuiz extends Component {

  state = {
    questions: null,
    questionIndex: 0,
    score: 0,
    feedback: '',
    quizState: true,
      };

      // from BlackJack, shuffles an array
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

  correctAns = () => {
    let feedback = '';
    let questionIndex = this.state.questionIndex;
    let score = this.state.score;
    score ++;


    // if we overflow our questions, reset button appears
    if (this.state.questionIndex >= this.state.questions.length - 1) {
      this.setState({
        quizState: false
      });
      feedback = [
          <div>
          Right! <br/><br/>
          <button onClick={this.initializeApp}> Reset App </button>
          </div>
      ];
    } else {
      questionIndex++;
      feedback = [
          <div>
          Right!
          </div>
      ];
    }

    this.setState({
      score,
      feedback,
      questionIndex
    });
  } // end correctAns

  wrongAns = () => {
    let feedback = '';
    let questionIndex = this.state.questionIndex;

    // if we overflow our questions, reset button appears
    if (this.state.questionIndex >= this.state.questions.length - 1) {
      this.setState({
        quizState: false
      });
      feedback = [
          <div>
          Wrong! <br/><br/>
          <button onClick={this.initializeApp}> Reset App </button>
          </div>
      ];
    } else {
      questionIndex ++;
      feedback = [
          <div>
          Wrong!
          </div>
      ];
    }

    this.setState({
      feedback,
      questionIndex
    });
  }


  initializeApp = () => {
    let questions = [
      {
        Q: 'What does API stand for?',
        A: [
          'Application Programming Interface',
          'Asynchronous Program Instructions',
          'Application Process Instructions',
          'Arsonic Potassium Iodide'
        ]
      },
      {
        Q: 'What is REACT?',
        A: [
          'An open source JS Library used as a framework for single page applications',
          'An API used to interface with Facebook',
          'A programming language that replaces Javascript',
          'A programming language that replaces HTML'
        ]
      },
      {
        Q: 'What does it mean to keep code DRY?',
        A: [
          'Don\'t repeat yourself, by using proper control flow tools',
          'Keep your code uncluttered with less comments',
          'Make your code use as few libraries and imports as possible',
          'Do not drink coffee right next to your laptop'
        ]
      },
      {
        Q: 'What Firebase command would you use to read your database data?',
        A: [
          `dataRef.on("value", (response)=> ...)`,
          `dataRef.set(data)`,
          `dataRef.return(data)`,
          `firebase.database.ref('dataRef')`
        ]
      },
      {
        Q: 'What is the difference between function myFunc() and myFunc = () => ?',
        A: [
          `The 'this.' reference is different`,
          `One is used as a promise`,
          `One runs in a different order`,
          `There is no difference`
        ]
      }
    ]; // end questions

    questions = this.fisherYates(questions);
    console.log(questions);

    this.setState({
      questions,
      score: 0,
      questionIndex: 0,
      feedback: '',
      quizState: true,
    });

  }


  componentDidMount() {

    this.initializeApp();

  }



  render() {

    let currentQuestion;
    let answerArray;
    let displayedAnswers;
    // current question
    // questions[questionIndex].Q
    // correct answer
    // questions[questionIndex].A[0]
    // how to randomize answers
    // randomize array [0,1,2,3] and then use those indexes to assign the question
    if (this.state.questions) {
      let answerOrder = this.fisherYates([0,1,2,3]);

    currentQuestion = this.state.questions[this.state.questionIndex].Q;

    answerArray = this.state.questions[this.state.questionIndex].A;

    displayedAnswers = answerOrder.map((newIndex, index) => {
      return (
        <li>

        {
          newIndex === 0 ?
          <button onClick={this.correctAns}> ({index}) </button>
          :
          <button onClick={this.wrongAns}> ({index}) </button>
        }

        {answerArray[newIndex]}

        </li>
      )
    });
  }



    return (
      <div className="main-container marginContainer">

        <div className="textBox">

        <h1>
          Welcome to JS Quiz! <br/><br/>
          <img src={require(`../images/cards/charStringSensei.png`)} width="200px"
          style={{borderRadius: "100px", border: "5px solid white"}} className="inlineB"
          />
          &nbsp;
          <img src={require(`../images/cards/charNumberSensei.png`)} width="200px"
          style={{borderRadius: "100px", border: "5px solid white"}} className="inlineB"
          />
          <br/><br/>
          Your Score is: {this.state.score}
          <br/> <br/>
          <b> {this.state.feedback} </b>
          <br/>

          { this.state.quizState ?
            <p>
              {currentQuestion} <br/>
              <ul style={{textAlign:"left"}}>
              {displayedAnswers}
              </ul>
            </p>
            :
            null
          }


        </h1>

        </div>


      </div>
    );
  }
}

export default JSQuiz;
