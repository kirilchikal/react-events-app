import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile"

interface Props {
    profile: Profile
}

export default observer(function ProfileView({profile}: Props) {
    function limitText(text: string | undefined, length: number) {
        if (text) {
            return text.length > length ? text.substring(0, length - 3) + '...' : text;
        }
    }

    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{limitText(profile.bio, 40)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                Number of followers
            </Card.Content>
        </Card>
    );
})