import React, { Component } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import logo from '../Media/Phonebook_Long.png';

function UserAvatar(props) {
    //if user avatar is available, return an img tag with the pic
    if (props.user.avatar) {
        return <img src={props.user.avatar}
                    alt="user"
                    className="rounded-circle align-self-center mr-2"
                    style={{width: '32px'}}></img>;
    }

    //No avatar available, return a default icon
    return <i className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
              style={{width: '32px'}}></i>;
}

function AuthNavItem(props) {
    //If authenticated, return a dropdown with the user info and a
    //sign out button
    if (props.isAuthenticated) {
        return (
            <UncontrolledDropdown>
                <DropdownToggle nav caret>
                    <UserAvatar user={props.user}/>
                </DropdownToggle>
                <DropdownMenu right>
                    <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
                    <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
                    <DropdownItem divider />
                    <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
    //Not Authenticated return sign in link
    return(
        <NavItem>
            <NavLink onClick={props.authButtonMethod}>Sign In</NavLink>
        </NavItem>
    );
}

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        let phonebookLink = null;
        if (this.props.isAuthenticated) {
            phonebookLink = (
                <NavItem>
                    <RouterNavLink to="/phonebook" className="nav-link" exact>Phonebook</RouterNavLink>
                </NavItem>
            );
        }

        return (
            <div>
                <Navbar color="dark" dark expand="md" fixed="top">
                    <Container>
                        <NavbarBrand href="/" >
                            <img src={logo} alt="Rainvale Phonebook Logo" height="42"/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
                                </NavItem>
                                {phonebookLink}
                            </Nav>
                            <Nav className="justify-content-end" navbar>
                                <AuthNavItem
                                    isAuthenticated={this.props.isAuthenticated}
                                    authButtonMethod={this.props.authButtonMethod}
                                    user={this.props.user} />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
