import React, { Component } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import { uploadProfileImage, deletePhoto, setMainPhoto } from "../userAction";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos:state.firestore.ordered.photos,
  loading:state.async.loading
});

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
  
};


class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  handlephotoDelete=(photo)=>async () =>{
    try{
      await this.props.deletePhoto(photo);
    }catch(error){
      toastr.error('Oops', 'Not Deleted')
    }
  }

  handlesetMainPhoto=photo=> async()=>{
    try{
      this.props.setMainPhoto(photo);
    }
    catch(error){
      toastr.error('Oops',error.message);

    }
  }
  uploadImagr = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success("Success!", "Image Has Been Uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", error.message);
    }
  };
  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };
  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };
  render() {
    const {photos, profile, loading}=this.props;
    let filteredPhotos;
    if(photos){
      filteredPhotos=photos.filter(photo=>{
        return photo.url !==profile.photoURL
      })
    }
    return (

      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or Click add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: "100%" }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: "200px", minWidth: "200px" }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                  loading={loading}
                    onClick={this.uploadImagr}
                    style={{ width: "100px" }}
                    positive
                    icon="check"
                  />
                  <Button
                  disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: "100px" }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL} />
            <Button positive>Main Photo</Button>
          </Card>

           {photos && filteredPhotos.map((photo)=>(

              <Card key={photo.id}>
            <Image src={photo.url} />
            <div className="ui two buttons">
              <Button onClick={this.handlesetMainPhoto(photo)} basic color="green">
                Main
              </Button>
              <Button onClick={this.handlephotoDelete(photo)} basic icon="trash" color="red" />
            </div>
          </Card>
           ))}
          
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);





