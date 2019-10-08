import React, { Component } from 'react';
import Nav from '../header/Nav'

class Dressup extends Component {

  state = {
    // set initial state of clothes (-1 is no clothes, otherwise it'd be indexes of clothes matrix)
    hair: -1,
    outfit: -1,
    hairPiece: '',
    outfitPiece: '',
    templateBody: 'charTemplate.png',
    hairs: [
      'charHair1.png',
      'charHair2.png',
      'charHair3.png'
    ],
    outfits: [
      'charOutfit1.png',
      'charOutfit2.png',
      'charOutfit3.png'
    ]


  };

  

handleClothesNext = (e) => {

  let outfit = this.state.outfit;
  let outfits = this.state.outfits;
  let outfitPiece = '';

  // make a condition so that our value of outfit loops back to -1 if it's too high
    if (outfit + 1 <= outfits.length -1) {
      outfit ++;

    } else {
      outfit = -1;

    }
    // set the outfit piece
    outfitPiece = outfits[outfit];
    this.setState({
      outfit,
      outfitPiece
    });
} // end handleClothesNext

handleClothesPrev = (e) => {

  let outfit = this.state.outfit;
  let outfits = this.state.outfits;
  let outfitPiece = '';

  // make a condition so that our value of outfit loops back to -1 if it's too high
    if (outfit - 1 >= -1) {
      outfit --;

    } else {
      outfit = outfits.length-1;

    }
    // set the outfit piece
    outfitPiece = outfits[outfit];
    this.setState({
      outfit,
      outfitPiece
    });
} // end handleClothesPrev

handleHairNext = (e) => {

  let hair = this.state.hair;
  let hairs = this.state.hairs;
  let hairPiece = '';

  // make a condition so that our value of hair loops back to -1 if it's too high
    if (hair + 1 <= hairs.length -1) {
      hair ++;

    } else {
      hair = -1;

    }
    // set the hair piece
    hairPiece = hairs[hair];
    this.setState({
      hair,
      hairPiece
    });
} // end handleHairNext


handleHairPrev = (e) => {

  let hair = this.state.hair;
  let hairs = this.state.hairs;
  let hairPiece = '';

  // make a condition so that our value of hair loops back to -1 if it's too high
    if (hair - 1 >= -1) {
      hair --;

    } else {
      hair = hairs.length-1;

    }
    // set the hair piece
    hairPiece = hairs[hair];
    this.setState({
      hair,
      hairPiece
    });
} // end handleHairPrev


  componentDidMount() {

  } // end componentDidMount

  render() {

    let hairPiece = this.state.hairPiece;
    let outfitPiece = this.state.hairPiece;

    if (hairPiece) {
      hairPiece = '../images/' + hairPiece;
    }
    if (outfitPiece) {
      outfitPiece = '../images/' + outfitPiece;
      console.log(outfitPiece);
    }

    return (
      <div className="main-container">

        <div style={{marginLeft:'10%', padding:'5%'}}>

        <center> <button className="btn btn-primary" onClick={this.handleHairPrev}> Prev Hair </button>

        <button className="btn btn-primary" onClick={this.handleHairNext}> Next Hair </button>
        <br/>
        <button className="btn btn-primary" onClick={this.handleClothesPrev}> Prev Outfit </button>
        <button className="btn btn-primary" onClick={this.handleClothesNext}> Next Outfit </button>
        <br/> </center>

          <div className="outfitDiv" style={{backgroundColor: 'white', width: '400px'}}>

          <img src={require('../images/charTemplate.png')}/>
            {
              this.state.hairPiece ?
              <img src={require(`../images/${this.state.hairPiece}`)} className="hairPiece"/>
              :
              <div></div>
            }
            {
              this.state.outfitPiece ?
              <img src={require(`../images/${this.state.outfitPiece}`)} className="outfitPiece"/>
              :
              <div></div>
            }

          </div>

        </div>

      </div>
    );
  }
}

export default Dressup;
