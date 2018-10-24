import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("succes", "Profile  Updated");
  } catch (error) {
    console.log(error);
  }
};
export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const imageName = cuid();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    //upload photo to firebase
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    //get url of image from firebase
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    //get userdoc from firebase
    let userDoc = await firestore.get(`users/${user.uid}`);
    //if the user has photo , if not then update it with new photo
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    //add new photo to the collections
    return await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Problem in uploading process");
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Oops Photo No deleted");
  }

};

export const setMainPhoto=photo=>
async(dispatch, getState, {getFirebase, getFirestore})=>{
     const firebase=getFirebase();
  try{
  return await firebase.updateProfile({
    photoURL:photo.url
  })
  }
  catch(error){
    console.log(error);
    throw new Error('Oops', 'Update is not working for mainProfile')
  }
}

















