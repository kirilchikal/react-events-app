import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Tab, Image, Header, Grid, Button } from "semantic-ui-react";
import ImageUploader from "../../app/common/imageUplaod/ImageUploader";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const { profileStore: { isCurrentUser, uploadImage, isImageUploading, 
    loading, setMainPhoto, deletePhoto }} = useStore();
  const [addPhotoState, setAddPhotoState] = useState(false);
  const [targetImg, setTargetImg] = useState('');

  function handleImageUpload(file: Blob) {
    uploadImage(file).then(() => setAddPhotoState(false));
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTargetImg(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTargetImg(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header content="Photos" floated="left" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoState ? "Cancel" : "Add photo"}
              onClick={() => setAddPhotoState(!addPhotoState)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoState ? (
            <ImageUploader loading={isImageUploading} uploadPhoto={handleImageUpload} />
          ) : (
            <Card.Group itemsPerRow={4}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button 
                        basic 
                        content='Main' 
                        color="green"
                        name={'m' + photo.id}
                        loading={'m' + photo.id === targetImg && loading} 
                        disabled={photo.isMain}
                        onClick={e => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        basic 
                        content='Delete' 
                        color="red"
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={photo.id === targetImg && loading}
                        onClick={e => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
