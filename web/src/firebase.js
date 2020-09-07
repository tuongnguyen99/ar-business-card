import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAOSJfvPA8cJz44-s-PHcJdDRO0SndwipE",
  authDomain: "ar-card-cb010.firebaseapp.com",
  databaseURL: "https://ar-card-cb010.firebaseio.com",
  projectId: "ar-card-cb010",
  storageBucket: "ar-card-cb010.appspot.com",
  messagingSenderId: "970021538220",
  appId: "1:970021538220:web:4de01aff69bc0885919209",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
