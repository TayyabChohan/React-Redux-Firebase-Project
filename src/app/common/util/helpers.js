import moment from 'moment'
export const createNewEvent=(user, photoURL, event)=>{
event.date=moment(event.date).toDate();
return{
    ...event,
    hostUid:user.uid,
    hostedBy:user.displayName,
    hostPhotoURL:photoURL || 'assets/user.png',
    created:Date.now(),
    attendees:{
       [user.uid]:{
           going:true,
           joinDate:Date.now(),
           photoURL:photoURL ||'assets/user.png',
           dsiplayName:user.displayName,
           host:true

       }

    }

}
}