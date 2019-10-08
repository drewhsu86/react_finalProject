import React, { Component } from 'react';
import firebase from 'firebase';
// import Nav from '../header/Nav'
import Firebase, { config, auth, provider } from './Firebase';
import Nav from './header/Nav';
import Dressup from './components/Dressup';


class HomeLogin extends Component {

  state = {

    data:[],
    user: null,
    userEmail: '',
    password: '',
    errorLoginMsg: '',
    fbTable: 'JSRCityUsers',

    profNick: '',
    profByear: '',
    profLoc: '',
    profDesc: '',
    profUpdate: false,

  };

handleChange = (e) => {
  console.log('handleChange ' + this.state.FirebaseRef);

  this.setState({
    [e.target.name]: e.target.value
  })
}

handleProfileSubmit = (e) => {

  e.preventDefault();

  if (this.state.user !== null) {
  const tableRef = firebase.database().ref(`${this.state.fbTable}/${this.state.user.uid}`);
  const profile = {
    profNick: this.state.profNick,
    profByear: this.state.profByear,
    profLoc: this.state.profLoc,
    profDesc: this.state.profDesc
  };

  tableRef.set(profile);
  this.setState({
    profUpdate: false
  });

  this.showList(tableRef);
} else {
  this.setState({
    errorLoginMsg: 'User is null: Could not change profile.'
  });

}

}

toggleUpdate = (e) => {

  this.setState({
    profUpdate: true
  });

}





showList = (data) => {
		data.on('value', (response) => {
			let listItems = response.val();

			let fireBaseData = null;

      console.log('Firebase value change confirmed.');
      console.log(listItems);

      console.log(currentUser);
			let currentUser = firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user && listItems) {
          fireBaseData = listItems[user.uid];
          console.log(user.uid);
          this.setState({
            data: fireBaseData,
            user,
          });
          try {
            this.setState({
              profNick: fireBaseData.profNick,
              profByear: fireBaseData.profByear,
              profLoc: fireBaseData.profLoc,
              profDesc: fireBaseData.profDesc,
            })
          } catch(e) {
            console.log(e);
          }
        } else {
          this.setState({
            data: fireBaseData,
            user: null
          });
        }
      });
      console.log(currentUser);

			this.setState({
        FirebaseRef: data,
			});


      console.log(this.state.FirebaseRef);
      console.log(this.state.data);
      console.log(this.state.user);


		}) // end on value firebase

	};  // end showList

login = () => {

    auth.signInWithEmailAndPassword(this.state.userEmail, this.state.password)
    .then((result) => {
      const user = result.user;
      this.setState({
        user,
        errorLoginMsg: ''
      });
    }) // end then
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Firebase sign in error: ' + error.code);
      console.log(error.message);
      this.setState({
        errorLoginMsg: error.code + '/n' + error.message
      });
    }); // end catch

    this.setState({
      userEmail: '',
      password: ''
    });

    console.log(this.state.user);

  } // end login

logout = () => {

    auth.signOut().then(() => {
      // successfully sign out
      this.setState({
        user: null,
        errorLoginMsg: ''
      });

    }).catch((error) => {
      // error handling
      console.log(error);
      this.setState({
        errorLoginMsg: error
      });

    });

    console.log(this.state.user);
  } // end logout

register = () => {
  auth.createUserWithEmailAndPassword(this.state.userEmail, this.state.password)
  .then((result) => {
    const user = result.user;
    this.setState({
      user,
      errorLoginMsg: ''
    });
    }
  )
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log('Firebase register error: ' + error.code);
    console.log(error.message);
    this.setState({
      errorLoginMsg: error.code + '/n' + error.message
    });
  });

  this.setState({
    userEmail: '',
    password: ''
  });

  console.log(this.state.user);
} // end register


  componentDidMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let app = firebase.database();
    let data = app.ref(this.state.fbTable);

    this.showList(data);


    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user });
    //   }
    // }
    // );



    } // end componentDidMount

// code for google auth login
/*
<div>
  <h2> Log in with Google Account </h2>
  {!this.state.user ?
  <button onClick={this.login}> Log in </button> :
  <button onClick={this.logout}> Log out </button>
  }
</div>
*/

  render() {

    return (
      <div className="main-container">

      <header className="App-header">
        <Nav />
      </header>



        <div className="relativeBubble">
        <h2> Log in or Log out </h2>

        {!this.state.user ?
          <div>
          <form className="form">

            User Email: <input type="text" name="userEmail" placeholder="userEmail" onChange={this.handleChange} value={this.state.userEmail} /> <br/>
            Password: <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={this.state.password} /> <br/>

          </form>

          <button onClick={this.login}> Log in </button> <button onClick={this.register}> Register </button>
          </div>

          :
          <div>
          Welcome, {this.state.user.email}! <br/>
        <button onClick={this.logout}> Log out </button>
        </div>
        }
        </div>

      {this.state.errorLoginMsg ?
        <div className="errorBox">
          <h3>
            {this.state.errorLoginMsg}
          </h3>
        </div>
        :
        <div> </div>
      }


      {
        this.state.user === null ?
        null
        :
        <div>
        <br/>

      {
        this.state.profUpdate ?
        null
        :
        <button onClick={this.toggleUpdate} style={{marginLeft: '5%', padding: '10px'}}> Change your profile! </button>
      }
        <div style={{position:'relative'}}>
        {
          this.state.profUpdate ?

          <form className="form relativeBubble" onSubmit={this.handleProfileSubmit} style={{width: '40%'}}>

          <h3>
          Enter your Nickname: <input type="text" name="profNick" placeholder="Your Nickname" onChange={this.handleChange} value={this.state.profNick} /> <br/>

          Enter your Birth Year: <input type="text" name="profByear" placeholder="Your Birth Year" onChange={this.handleChange} value={this.state.profByear} /> <br/>

          Enter your Location: <input type="text" name="profLoc" placeholder="Your Location" onChange={this.handleChange} value={this.state.profLoc} /> <br/>

          Tell us about you!: <input type="text" name="profDesc" placeholder="About you! Interests, likes and dislikes, personality... anything!" onChange={this.handleChange} value={this.state.profDesc} style={{height: '200px', width: '300px'}}/> <br/>

          <br/>
          &nbsp; <button> Submit Changes! </button>

          </h3>
          </form>
          :

          <div className="relativeBubble" style={{width: '40%'}}>

            <h3>

            <b> Your Nickname: </b> {this.state.profNick ? this.state.profNick : 'Pick a nickname!'} <br/><br/>

            <b> Your Age: </b> {this.state.profByear? Math.floor(parseFloat(new Date().getFullYear())-parseFloat(this.state.profByear)) : 'Set your birth year!'} <br/><br/>

            <b> Your Location: </b> {this.state.profLoc ? this.state.profLoc : 'Set your location!'} <br/><br/>

            <b> About You: </b> {this.state.profDesc ? this.state.profDesc : 'Tell us about you!'} <br/><br/>

            </h3>

          </div>
        }

          <div style={{left: '50%', top: '-30%', position: 'absolute'}}> <Dressup /> </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default HomeLogin;
