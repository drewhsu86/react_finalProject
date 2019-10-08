import React, { Component } from 'react';



class JSONQuiz extends Component {

  state = {
      urlInput: `https://headshot.mockable.io/menu/advanced`,
      data: {},
      paths: [],
      pathObj: [],
      jsonName: 'rootObj',
      yourGuess: '',
      correctAns: '',
      randomPath: null,
      randomObj: null,
      correctness: '',
      };


handleChange = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  });

} // end handleChange

handleURLClick = (e) => {

  e.preventDefault();

  fetch(this.state.urlInput)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
    this.setState({
        data: response
    });
  })
  .then(() => {
    // run our subfunction which calculations paths
    let paths = this.allPathsArray(this.state.data, []);  // when rootObjName is an empty array, it means to not add it to start of paths
    let pathObj = this.pathsObj(paths);
    let returnPaths = this.returnPaths(this.state.data, 'rootObj');
    console.log(returnPaths);
    this.setState({
      paths,
      pathObj,
      returnPaths
    });
  }).then(() => {

  let randomPiece = this.state.paths[Math.round(Math.random()*(this.state.paths.length-1))];
  let randomObj = this.pathsObj([randomPiece])[0];
  let correctAns = randomObj['key'];

  console.log(correctAns);
    this.setState({
      randomPiece,
      randomObj,
      correctAns,
      correctness: ''
    });
  });

} // end handleURLClick

allPathsArray = (rootObj, rootObjName) => {
  let allPaths = [];
  this.findPaths(rootObj,rootObjName,allPaths);
  return allPaths;
}

// test to see if allPathsArray console logs the right paths for rootObj (test object called rootObj)
// allPathsArray(rootObj);

// recursive function to be used by allPathsArray (so a subfunction)
// container must be a array or object
// heldPath must be array of primitives
findPaths = (container,heldPath,masterPaths) => {

  // going through every key in this container (for in should work for both arrays and objects)
  for (let key in container) {
    let tempPath = [];
      // tempPath copy over heldPath
      for (let elem of heldPath) {
        tempPath.push(elem);
      }
      // now that tempPath is prepared, time to process what's actually in this key of the container
        tempPath.push(key);

      if (typeof container[key] !== 'object' && typeof container[key] !== 'array') {
        // if primitive, add the actual content to the tempPath
        tempPath.push(container[key]);
        masterPaths.push(tempPath); // master array should be holding a number of arrays

      } else {
        // if container, need to run this function recursively
        this.findPaths(container[key], tempPath, masterPaths); // trying to recursively call this function using the current node as the new root

      }
  }
} // end findPaths

// change the paths to make it an array of objects, where the final element is separate from the others because it is a primitive datatype not a path
pathsObj = (paths) => {

  // make an object, make each key the last element of the original paths arrays's array, and then add that to the return object
  let returnObj = [];

  for (let index in paths) {

    // we use slice to not alter original array
    // first, slice the last element in paths to make our new key
      let key = paths[index].slice(paths[index].length - 1,paths[index].length);
      key = key[0]; // make it not an array
      console.log('key: ' + key);
    // then we slice the rest to make the new array
      let shortPath = paths[index].slice(0,paths[index].length - 1);

      returnObj.push(
      {
        key: key,
        path: shortPath
      }
      );

  } // end for index in paths

  console.log(returnObj);
  return returnObj;

} // end pathsObj(paths)

// returns a string, we'd try to evaluate as JSX
returnPaths = (container, title) => {

  let template = `<ul>`;

  // going through every key in this container (for in should work for both arrays and objects)
  for (let key in container) {

    if (typeof container[key] !== 'object' && typeof container[key] !== 'array') {
      // if primitive, add the actual content as list element
      template += `<li> &nbsp; ${key}: ${container[key]} </li>`;

    } else {

      template += `<li> &nbsp; ${key}: </li>`;
      // if container, need to run this function recursively
      template += this.returnPaths(container[key], key); // trying to recursively call this function using the current node as the new root
        template += `</li>`;
    }

  } // end for key in container

  template += `</ul>`;

  return template;
} // end returnPaths

tryGuess = (e) => {
  e.preventDefault();

  let answer = this.state.correctAns;
  let correctness = '';

  if (typeof answer !== "string") {
    answer = String(answer)
  }

  if (this.state.yourGuess === answer) {
    correctness = 'Right!'
  } else {
    correctness = 'Does not match.'
  }

  this.setState({
    correctness
  });

}


  componentDidMount() {



  }

  render() {

    let quizManager =
      <div className="textBox">
      <h3> Load in an API to begin! <br/>
      A random piece of the JSON object will be selected for you! </h3>
      </div>

      console.log(this.state.paths);


    if (this.state.paths.length > 0 && this.state.randomObj !== null) {

      let result = this.state.randomObj['path'].map((node) => {
        return (
          <span> [{node}] </span>
        );
      });

      quizManager =
        <div className="textBox">
        <h1> Find this value!!! </h1>
        <h3>
        JSON Object: <br/>
        <b> response </b> {result} =

        <form onSubmit={this.tryGuess}>
          <input onChange={this.handleChange} name="yourGuess" placeholder="?"/> ?
          <br/>
          <button style={{border:"3px solid black"}}> > Try Answer </button>
        </form>
        &nbsp; <span style={{border:"3px solid black", backgroundColor: "white"}}> {this.state.correctness} </span>
        </h3>
        </div>
    }

    return (
      <div className="main-container marginContainer">


        {quizManager}


        <form className="form-group">
        <h2 className="textBox"> Press the button to print JSON object below! </h2>

        Enter URL: <input className="form-control" type="text" value={this.state.urlInput} name="urlInput" onChange={this.handleChange} placeholder="http://headshot.mockable.io/menu/advanced" /> <br/>


        <button className="btn btn-success" onClick={this.handleURLClick}> Use this URL </button>
        </form> <br/>




        <div className="textBox">
          <h3>
            <b> Suggested (free) APIs: </b> <br/>
            <br/>
            Menu API from class:<br/>
            <a href="https://headshot.mockable.io/menu/advanced" target="_blank"> https://headshot.mockable.io/menu/advanced </a> <br/>
            Star Wars API (append https://swapi.co/api/ with [category]/[dataNumber]/) <br/>
            e.g. <a href="https://swapi.co/api/people/1/" target="_blank"> https://swapi.co/api/people/1/ </a> (This entry is Luke Skywalker) <br/>
          </h3>
        </div>

        <div className="textBox">
          <h3>


          <div style={{textAlign: "left"}}
          dangerouslySetInnerHTML={{__html:this.state.returnPaths}}
          />



          </h3>
        </div>


      </div>
    );
  }
}

export default JSONQuiz;
