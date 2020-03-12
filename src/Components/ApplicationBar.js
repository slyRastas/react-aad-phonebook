import React, { Component } from 'react'
import clsx from 'clsx';
import { NavLink as RouterNavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Avatar,
    Button,
    Drawer,
    Divider,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Home,
    AccountCircle,
    Contacts,
    Business,
    Feedback,
} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu'
import { compose } from 'recompose'
import { withRouter } from 'react-router'

const drawerWidth = 240;

const classes = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: (theme.palette.type === 'dark') 
            ? 'linear-gradient(45deg, #6D6E71 30%, #00A5D8 90%)'
            : 'linear-gradient(45deg, #00A5D8 30%, #6D6E71 90%)',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        zIndex: 1000,
        [theme.breakpoints.down('md')]: {
            width: '1px',
        }
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.down('sm')]: {
            width: '0px',
            display: 'none',
        },
        [theme.breakpoints.up('xs')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    listitem: {
        padding: '24px',
        //[theme.breakpoints.down('sm')]: {
        //    padding: '16px',
        //},
    }
});

function UserAvatar(props) {
    //if user avatar is available, return an img tag with the pic
    if (props.user.avatar) {
        return <Avatar src={props.user.avatar}/>;
    }
    //No avatar available, return a default icon
    return <AccountCircle />;
}


class ApplicationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            drawerOpen: false,
        }

        this.handleDrawerAction = this.handleDrawerAction.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //this.authButtonMethod = props.authButtonMethod();
    };

    handleDrawerAction() {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        })
    }

    handleDrawerClose() {
        this.setState({
            drawerOpen: false,
        })
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleClose() {
        this.setState({
            anchorEl: null,
        })
    }

    handleLogout() {
        this.authButtonMethod();
        this.handleClose();
    }

    renderTitle(pathname) {
        switch(pathname) {
            case "/people":
                return "People"
            case "/offices":
                return "Offices"
            default:
                return "Home"
        }
    }

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar 
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.drawerOpen
                    })}>
                    <Toolbar >
                        <IconButton 
                            color="inherit"
                            edge="start" 
                            aria-label="open drawer" 
                            onClick={this.handleDrawerAction}
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.drawerOpen,
                            })}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            { this.renderTitle(this.props.location.pathname) }
                        </Typography>
                        { this.props.isAuthenticated && (
                            <div>
                            <IconButton
                                edge="end"
                                aria-label="Current User Account"
                                aria-controls="account-appbar"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                color="inherit"   
                            >
                                <UserAvatar user={this.props.user}/>
                            </IconButton>
                            <Menu
                                id="account-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal:'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal:'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={() => {this.props.authButtonMethod(); this.handleClose();}}>Logout</MenuItem>
                            </Menu>
                            </div>
                        )}
                        { !this.props.isAuthenticated && (
                            <div>
                            <Button color="inherit" onClick={this.props.authButtonMethod}>Login</Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.drawerOpen,
                        [classes.drawerClose]: !this.state.drawerOpen,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.drawerOpen,
                            [classes.drawerClose]: !this.state.drawerOpen,
                        }),
                    }}>
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerAction}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button className={classes.listitem} key={"home"} onClick={this.handleDrawerClose} component={RouterNavLink} to="/">
                                <ListItemIcon >
                                    <Home />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            { this.props.isAuthenticated && (
                                <div>
                                <ListItem button className={classes.listitem} key={"People"} onClick={this.handleDrawerClose } component={RouterNavLink} to="/people">
                                    <ListItemIcon >
                                        <Contacts/>
                                    </ListItemIcon>
                                    <ListItemText primary="People" />
                                </ListItem>
                                <ListItem button className={classes.listitem} key={"Offices"} onClick={this.handleDrawerClose} component={RouterNavLink} to="/offices">
                                    <ListItemIcon>
                                        <Business />
                                    </ListItemIcon>
                                    <ListItemText primary="Offices" />
                                </ListItem>
                                </div>
                            )}
                            <ListItem button className={classes.listitem} key={"feedback"} onClick={this.handleDrawerClose} component={RouterNavLink} to="/feedback">
                                <ListItemIcon >
                                    <Feedback />
                                </ListItemIcon>
                                <ListItemText primary="Feedback" />
                            </ListItem>
                        </List>
                </Drawer>
            </div>
        );
    }
}

//export default withStyles(classes)(ApplicationBar)

export default compose(withStyles(classes), withRouter)(ApplicationBar)