import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import About from './About';
import Clicker from './components/Clicker';
import Clubhouse from './Clubhouse';
import Library from './Library';
import JSQuiz from './components/JSQuiz';
import JSONQuiz from './components/JSONQuiz';
import HomeLogin from './HomeLogin';
import Fair from './components/Fair';
import FrontScreen from './components/FrontScreen';
import APODAPI from './components/APODAPI';
import NewsAPI from './components/NewsAPI';
import BlackJack from './components/BlackJack';

class AppRouter extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={App}/>
              <Route path="/about" component={About} />
              <Route path="/clicker" component={Clicker} />
              <Route path="/jsonQuiz" component={JSONQuiz} />
              <Route path="/profile" component={HomeLogin} />
              <Route path="/clubhouse" component={Clubhouse} />
              <Route path="/fair" component={Fair} />
              <Route path="/library" component={Library} />
              <Route path="/frontscreen" component={FrontScreen} />
              <Route path="/apodapi" component={APODAPI} />
              <Route path="/newsapi" component={NewsAPI} />
              <Route path="/blackjack" component={BlackJack} />
              <Route path="/jsquiz" component={JSQuiz} />

            </Switch>
        </BrowserRouter>
    );
  }
}

export default AppRouter;
