import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();

  return (
    <Segment textAlign="center" inverted className="masthead">
      <Container text>
        <Header inverted as="h1">
          <Image
            src="assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12, width: 256 }}
          />
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Wellcome to eventer!" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Take me to events
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
})
