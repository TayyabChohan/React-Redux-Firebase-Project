const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createActivity=functions.firestore
.document('events/{eventId}')
.onCreate(event =>{
  let newEvent=event.data();
  console.log(newEvent);
})

