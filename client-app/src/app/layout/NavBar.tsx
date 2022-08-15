import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default function NavBar() {

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:10, width: 128}}/>
                </Menu.Item>
                <MenuItem as={NavLink} to='/activities' name='Events'/>
                <MenuItem>
                    <Button as={NavLink} to='/createActivity' positive content='Create Event'/>
                </MenuItem>
            </Container>
        </Menu>
    )
}