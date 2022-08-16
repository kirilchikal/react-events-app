import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";


export default function HomePage() {
    return (
        <Segment textAlign="center" inverted className="masthead" >
            <Container text >
                <Header inverted as='h1'>
                    <Image src='assets/logo.png' alt='logo' style={{marginBottom: 12, width: 256}}/>
                </Header>
                <Header as='h2' inverted content='Wellcome to eventer!' />
                <Button as={Link} to='/activities' size="huge" inverted>
                    Take me to events
                </Button>
            </Container>
        </Segment>
    )
}