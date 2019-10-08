import React, { Component } from 'react';
import firebase from 'firebase';
import Target from './Target';
// import Nav from '../header/Nav'
import Firebase from '../Firebase';
import { config } from '../Firebase';

class FirebaseList extends Component {

  state = {

    data:[]

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


  componentDidMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let app = firebase.database();
    let data = app.ref('FirebaseTest');

    this.showList(data);


      // const tableRef = Firebase.database().ref('FirebaseTest');
      // tableRef.on('value', (snapshot) => {
      //   let items = snapshot.val();
      //   let newState = [];
      //   for (let item in items) {
      //     newState.push({
      //       id: item,
      //       item: items[item]
      //     });
      //
      //     this.setState({
      //       data: newState
      //     })
      //   } // for item in item
      // });



  } // end componentDidMount


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


  render() {


    return (
      <div className="main-container">
        <header className="App-header">

        </header>

        <form className="form-inline" onSubmit={this.handleSubmit}>

          <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} />

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
