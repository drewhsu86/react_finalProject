import React, { Component } from 'react';
import Target from './Target';
import Nav from '../header/Nav'

class JSONTree extends Component {

  state = {
      urlInput: `http://headshot.mockable.io/menu/advanced`,
      data: {},
      paths: [],
      pathObj: [],
      jsonName: 'rootObj'
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
    this.setState({
      paths,
      pathObj
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


  componentDidMount() {



  }

  render() {



    return (
      <div className="main-container">
        <header className="App-header">
          <Nav />
        </header>

        <form className="form-group">
        <h2> Print the paths of all non-containers of a JSON Object! </h2>

        Enter URL: <input className="form-control" type="text" value={this.state.urlInput} name="urlInput" onChange={this.handleChange} placeholder="http://headshot.mockable.io/menu/advanced" /> <br/>

        Enter Name for Returned Object (default = 'rootObject'): <input className="form-control" type="text" value="this.state.jsonName" name="jsonName" onChange={this.handleChange} placeholder="rootObject"/> <br/>

        <button className="btn btn-success" onClick={this.handleURLClick}> Use this URL </button>
        </form> <br/>

        <a href="js/index.js" target="_blank"> Get my JS file here </a>
        <br/>

        <div className="textBox">
          <h3>
            <b> Suggested (free) APIs: </b> <br/>
            <br/>
            Menu API from class:<br/>
            <a href="http://headshot.mockable.io/menu/advanced" target="_blank"> http://headshot.mockable.io/menu/advanced </a> <br/>
            Star Wars API (append https://swapi.co/api/ with [category]/[dataNumber]/) <br/>
            e.g. <a href="https://swapi.co/api/people/1/" target="_blank"> https://swapi.co/api/people/1/ </a> (This entry is Luke Skywalker) <br/>
          </h3>
        </div>

        <div className="textBox">
          <h3>

          {
            this.state.pathObj.map((thisPath) => {
              return (
              <li className="list-item">
                  <h4> &nbsp; <i><u> {thisPath.key}</u>: </i> <b> {this.state.jsonName} </b>

                  {
                    thisPath.path.map((container) => {
                      return (
                        <span> [{container}] </span>
                      )
                    })
                  }
                </h4>

              </li>
            )
          })
          }

          </h3>
        </div>


      </div>
    );
  }
}

export default JSONTree;
