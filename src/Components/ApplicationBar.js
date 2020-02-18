import React, { Component } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Avatar,
    Button,
} from '@material-ui/core';
import {
    Home,
    AccountCircle,
    Contacts,
} from '@material-ui/icons';

function UserAvatar(props) {
    //if user avatar is available, return an img tag with the pic
    if (props.user.avatar) {
        return <Avatar src={props.user.avatar}/>;
    }
    //No avatar available, return a default icon
    return <AccountCircle />;
}

function AuthItem(props) {
    if (props.isAuthenticated) {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        }

        const handleClose = () => {
            setAnchorEl(null)
        }

        return (
            <div>
                <IconButton
                    aria-label="Current User Account"
                    aria-controls="account-appbar"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                    >
                    <UserAvatar />
                </IconButton>
                <Menu
                    id="account-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
                    <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
                    <MenuItem divider />
                    <MenuItem onClick={props.authButtonMethod}>Sign Out</MenuItem>
                </Menu>
            </div>
        )
    }

    return(<Button color="inherit" onClick={props.authButtonMethod}>Login</Button>)
}

export default class ApplicationBar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar edge="start" color="inherit" aria-label="menu" aria-controls="menu">
                        <Home />
                        <Contacts>
                            <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
                        </Contacts>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
