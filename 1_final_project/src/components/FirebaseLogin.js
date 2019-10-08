import React, { Component } from 'react';
import firebase from 'firebase';
import Target from './Target';
// import Nav from '../header/Nav'
import Firebase, { config, auth, provider } from '../Firebase';


class FirebaseList extends Component {

  state = {

    data:[],
    user: null

  };

handleChange = (e) => {
  console.log('handleChange');

  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = (e) => {
  console.log('handleSubmit');
  e.preventDefault();
  const tableRef = this.state.FirebaseRef;
  const item = {
    username: this.state.username
  };

  tableRef.push(item);
  this.setState({
    username:''
  });

  this.showList(tableRef);

}

removeItem = (itemID) => {
  console.log('removeItem');
  const tableRef = this.state.FirebaseRef;
  const itemRef = Firebase.database().ref(`FirebaseTest/${itemID}`);
  itemRef.remove();

  this.showList(tableRef);
}





  showList = (data) => {
		data.on('value', (response) => {
			let listItems = response.val();

			let fireBaseData = [];

			for (let item in listItems) {
				let newItem = {
					id: item,
					item: listItems[item]
				};

				fireBaseData.push(newItem);
			}

			this.setState({
				data: fireBaseData,
        FirebaseRef: data
			});

      // console.log(this.state.data);
		});
	};

  login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    }
    )
  } // end login

  logout = () => {

    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    }
  );

  } // end logout


  componentDidMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let app = firebase.database();
    let data = app.ref('FirebaseTest');

    this.showList(data);


    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    }
    );

    } // end componentDidMount


  render() {

    return (
      <div className="main-container">
        <header className="App-header">

        </header>

        /* <div>
          <h2> Log in with Google Account </h2>
          {!this.state.user ?
          <button onClick={this.login}> Log in </button> :
          <button onClick={this.logout}> Log out </button>
          }
        </div> */

        <form className="form-inline" onSubmit={this.handleSubmit}>

          Enter your username: <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} />

        </form>

        <ul className="list-group">
          {this.state.data.map((item) => {
            return (
              <li className="list-group-item" key={item.id}>
                <h3> Username: {item.item.username} </h3>
                <button onClick={() => this.removeItem(item.id)}> Remove </button>
              </li>
            )
          })
          }
        </ul>

      </div>
    );
  }
}

export default FirebaseList;
