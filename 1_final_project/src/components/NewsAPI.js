import React, { Component } from 'react';


class APODAPI extends Component {

  state = {

    urlStart: 'https://newsapi.org/v2/everything?',
    urlKey: 'apiKey=4ab6e6c386ce4fb7a4835e30e7757e5c',
    data: null,
    newsTopic: '',
    article: null

  };

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  // random article from API returned list of Articles
  // response.articles[index of article]
  initializeAPI = () => {

    let newURL = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + this.state.urlKey;

    let topic = this.state.newsTopic;

    if (topic !== '') {
      let newsTopic = `q=${topic}&`;
    	newURL = this.state.urlStart + newsTopic + this.state.urlKey;
    }



      fetch(newURL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);


        this.setState({
            data: response,
        })

          return this.state.data;
        })
        .then((response) => {

          let articlesLen = response.articles.length;
          let randomIndex = Math.round(Math.random()*(articlesLen-1));
          let randomArticle = response.articles[randomIndex];


          this.setState({
              article: randomArticle
          })
        })
      } // end initializeApp



  componentDidMount() {

    // random date string format: date=YYYY-MM-DD
    // Start date June 16, 1995
    //


    this.initializeAPI();



  } // end componentDidMount

  render() {


    return (


      <div>
        <div className="relativeBubble">

          <p> Today's Date: {this.state.thisYear}-{this.state.thisMonth}-{this.state.thisDate}
          &nbsp; <button onClick={this.initializeAPI}> Random Article </button> <br/>
          News Topic (Optional): <input name="newsTopic" value={this.state.newsTopic} onChange={this.handleChange}/>
          </p>
          {
            this.state.article !== null ?
            <p>
            <h1> {this.state.article.title} </h1>
            <p> From: {this.state.article.author} </p>
            <img src={this.state.article.urlToImage} style={{position: "relative", width: "80%"}} />
            <br/>
            <br/>
            <br/>
            <a href={this.state.article.url}> {this.state.article.description} </a>
            {this.state.article.content !== null ? <p> {this.state.article.content} </p> : null}
            </p>
            :
            null
          }

        </div>


      </div>

    );
  }
}

export default APODAPI;
