

import 'firebase/database'
import firebase from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyCM2OjXP3uVjhArRyoCj92m_xOiDaXjnmY",
  authDomain: "gatro-d5671.firebaseapp.com",
  databaseURL: "https://gatro-d5671-default-rtdb.firebaseio.com",
  projectId: "gatro-d5671",
  storageBucket: "gatro-d5671.appspot.com",
  messagingSenderId: "687583885876",
  appId: "1:687583885876:web:893343089d7afcd3432861"
};

  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();