import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './header/Nav';
import { uniqueKey } from './utils/helper';
import Firebase from './Firebase';
import City from './City';

let sampleData = [ 'some', 'sample', 'data' ];

// if you want to store any variables in .env
// to access them first write
// process.env.REACT_APP_CUSTOM_NAME
// but add what the name of your variable is in place of CUSTOM_NAME

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Nav />
				</header>

				<City />

			</div>
		);
	}
}

export default App;
