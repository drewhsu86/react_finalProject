import React, { Component } from 'react';

class Target extends Component {

  state = {

  };



  render() {

    let newPos = {
      left: this.props.randLeft,
      top: this.props.randTop
    }

    return (

        <div className="clickerTarget" key={'mainBullsEye'} onClick={this.props.clicker} style={newPos}>
            <div className="clickerTargetInner bgWhite">
              <div className="clickerTargetInner bgRed">
              <br/><br/> click here!
              </div>
            </div>
        </div>

    );
  }
}

export default Target;
