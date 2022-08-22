import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment, SegmentInline } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oop could not find this
            </Header>
            <SegmentInline>
                <Button as={Link} to='/activities' primary>
                    Return to events
                </Button>
            </SegmentInline>
        </Segment>
    )
}