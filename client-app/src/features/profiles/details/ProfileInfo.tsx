import { Button, Grid, Header, Icon, Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import ProfileEditForm from "../form/ProfileEditForm";

export default observer(function ProfileInfo() {
    const {profileStore: {isCurrentUser, profile}} = useStore();
    const [editMode, setEditMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} >
                    <Header floated="left">
                        {editMode && <Icon name="edit"/>}
                        {editMode ? "Edit" : "About"}
                    </Header>
                    {isCurrentUser && (
                        <Button 
                            basic
                            floated="right"
                            color={editMode ? "red" : "green"}
                            content={editMode ? "Cancel" : "Edit profile"}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16} >
                    {editMode ? <ProfileEditForm setEditMode={setEditMode} /> : (
                        <p style={{whiteSpace:"pre-wrap"}}>{profile?.bio}</p>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
})