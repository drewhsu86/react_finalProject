import React, { Component } from 'react';


class APODAPI extends Component {

  state = {

    urlStart: 'https://api.nasa.gov/planetary/apod?api_key=',
    urlKey: 'JCHTlenRNMwdLz1xWC1ne7AT9teDLx8PxTtfufiP',
    data: null,

  };

  // set up today's date and a random date in this.state
  initializeDates = () => {

    const startYear = 1995;
    const startMonth = 6;
    const startDate = 16;

    let d = new Date();
    let thisYear = d.getFullYear();
    let thisMonth = d.getMonth() + 1;
    let thisDate = d.getDate();

    // the End date is thisYear, thisMonth, thisDate

    let randYear = startYear + Math.round(Math.random()*(thisYear-startYear));
    let randMonth = 12;
    let randDate = 1;

    // if the random year is this year, it can't go beyond today or yesterday (whenever APOD updates)
    // to make it safe i will reduce the month by 1
    if (randYear === thisYear && thisMonth > 1) {

      randMonth = Math.floor(Math.random()*(thisMonth-1)) + 1;

    } else if (randYear === thisYear && thisMonth === 1) {

      randYear --;
      randMonth = 12;

    } else {
      randMonth = Math.floor(Math.random()*(12)) + 1;
    }

    let maxDate = 31;
    // set up the max days of the month so that we can choose a random date
    if ([4, 6, 9, 11].indexOf(randMonth) !== -1) {
      maxDate = 30;
    } else if (randMonth === 2) {
      maxDate = 28;
    }

    randDate =  Math.floor(Math.random()*(maxDate)) + 1;


    this.setState({
      thisYear,
      thisMonth,
      thisDate,
      randYear,
      randMonth,
      randDate,
      urlRandDate: `${randYear}-${randMonth}-${randDate}`
    });

      let randomDate = `${randYear}-${randMonth}-${randDate}`;

      let urlTotal = this.state.urlStart + this.state.urlKey + '&date=' + randomDate;

      console.log(urlTotal);
      fetch(urlTotal)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        this.setState({
            data: response
        });
      })
  }



  componentDidMount() {

    // random date string format: date=YYYY-MM-DD
    // Start date June 16, 1995
    //


    this.initializeDates();



  } // end componentDidMount

  render() {


    return (


      <div>
        <div className="relativeBubble">

          <p> Today's Date: {this.state.thisYear}-{this.state.thisMonth}-{this.state.thisDate}
          &nbsp; <button onClick={this.initializeDates}> New Random Image </button>
          </p>
          {
            this.state.data !== null ?
            <p>
            <p> Photo's Date: {this.state.data.date} </p>
            <img src={this.state.data.url} style={{position: "relative", width: "80%"}} />
            <br/>
            <br/>
            Explanation: <br/> {this.state.data.explanation} </p>
            :
            null
          }

        </div>


      </div>

    );
  }
}

export default APODAPI;
