import firebase from 'firebase';


		// Initialize Firebase
		export const config = {
			apiKey: "AIzaSyCgBfbOWF4fNnrWzXyv3Ze_W9YVz8mpZAc",
			authDomain: "jsr520class.firebaseapp.com",
			databaseURL: "https://jsr520class.firebaseio.com",
			projectId: "jsr520class",
			storageBucket: "",
			messagingSenderId: "1012125704824",
			appId: "1:1012125704824:web:8fe6b462e0161fbb"
		  };

		firebase.initializeApp(config);

		export const provider = new firebase.auth.GoogleAuthProvider();

		export const auth = firebase.auth();

		export default firebase;
