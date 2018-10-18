import firebase from 'firebase'
import  'firebase/firestore';
const configfirebase={
    apiKey: "AIzaSyBymtljg1UqpONEalCHVGyreDnLp7zKtWA",
    authDomain: "revents-219119.firebaseapp.com",
    databaseURL: "https://revents-219119.firebaseio.com",
    projectId: "revents-219119",
    storageBucket: "",
    messagingSenderId: "731085070434"

}
firebase.initializeApp(configfirebase);
firebase.firestore();
export default firebase
