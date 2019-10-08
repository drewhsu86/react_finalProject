import React, { Component } from 'react';


class FrontScreen extends Component {

  state = {

  };




  componentDidMount() {



  } // end componentDidMount

  render() {


    return (


      <div className="frontScreen" style={{display: `${(this.props.visible === 'true' ? 'block' : 'none')}`,
      width: `${this.props.width ? this.props.width : '90%'}`,
      height: `${this.props.height ? this.props.height : '90%'}`,
      }}>
      {this.props.content}

        <button className="frontScreenExit" onClick={this.props.exit}> Exit </button>

      </div>

    );
  }
}

export default FrontScreen;
