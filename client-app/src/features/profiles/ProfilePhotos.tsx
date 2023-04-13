import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Card, Tab, Image, Header, Grid, Button } from "semantic-ui-react";
import ImageUploader from "../../app/common/imageUplaod/ImageUploader";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser },
  } = useStore();
  const [addPhotoState, setAddPhotoState] = useState(false);

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
            <ImageUploader />
          ) : (
            <Card.Group itemsPerRow={4}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
