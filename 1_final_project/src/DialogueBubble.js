import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


class DialogueBubble extends Component {

  state = {

  };

handleChange = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  })
}









  componentDidMount() {


    } // end componentDidMount


// list of props to use
/*
  top
  left (starting positions)
  width
  height (for dialogue bubble)
  clickFunct (function when clicked)
  msg (text to show)
  linkTxt
  linkLink (mostly for nav links)
*/

  render() {
    // console.log(`${parseFloat(this.props.width)/2}`);
    return (
      <div className="dialogue" style={{top:this.props.top, left:this.props.left}}>


      {
        this.props.triangle ?
        <div className="triangleDown" style={{top:'-2px', left:`${(parseFloat(this.props.width !== "auto" && this.props.width ? this.props.width : 40+20)/2)-20 + (this.props.shiftTriangle ? parseFloat(this.props.shiftTriangle) : 0)}px`}}> </div>
        :
        null
      }

      {
        this.props.triangleLeft ?
          <div className="triangleLeft" style={{left:'-38px', bottom:`${(parseFloat(this.props.height !== "auto" && this.props.height ? this.props.height : 40+20)/2)-20 + (this.props.shiftTriangle ? parseFloat(this.props.shiftTriangle) : 0)}px`}}> </div>
        :
        null
      }

      {
        this.props.triangleRight && this.props.width && this.props.width !== "auto"?
          <div className="triangleRight" style={{left:`${parseFloat(this.props.width) - 2}px`, bottom:`${(parseFloat(this.props.height !== "auto" && this.props.height ? this.props.height : 40+20)/2)-20 + (this.props.shiftTriangle ? parseFloat(this.props.shiftTriangle) : 0)}px`}}> </div>
        :
        null
      }




        <div className="dialogueBubble" style={{bottom:'0', left:'0', width:this.props.width, height:this.props.height}}
        onClick={this.props.clickFunct}>

        {
          this.props.msg ?
          <p> {this.props.msg} </p>
          :
          null
        }

        {
          this.props.linkLink && this.props.linkTxt ?
          <Link to={this.props.linkLink}> <div className="dialogueButton" style={{backgroundColor: (this.props.bgColor ? this.props.bgColor : 'blue'), color: (this.props.lkColor ? this.props.lkColor : 'white')}}>{this.props.linkTxt}</div> </Link>
          :
          null

        }

        </div>



      </div>
    );
  }
}

export default DialogueBubble;
