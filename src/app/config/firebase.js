import firebase from 'firebase'
import  'firebase/firestore';
const configfirebase={
    apiKey: "AIzaSyBymtljg1UqpONEalCHVGyreDnLp7zKtWA",
    authDomain: "revents-219119.firebaseapp.com",
    databaseURL: "https://revents-219119.firebaseio.com",
    projectId: "revents-219119",
    storageBucket: "revents-219119.appspot.com",
    messagingSenderId: "731085070434"

}
firebase.initializeApp(configfirebase);
const firestore= firebase.firestore();
const settings={
    timestampsInSnapshots:true
}
firestore.settings(settings)
export default firebase
