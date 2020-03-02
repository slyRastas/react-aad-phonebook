import React, { Component } from 'react'
import{
    Button,
    Paper,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Phonebook_Long from '../Media/Phonebook_Long.png'

const classes = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            //paddingLeft: theme.spacing(8),
            marginLeft: theme.spacing(8),
        }
    },
    img: {
        height: '64px',
        [theme.breakpoints.down('sm')]: {
            height: '24px'
        }
    }
  });

function WelcomeContent(props) {
    //If Authenticated, greet user
    if (props.isAuthenticated) {
        return (
            <div>
                <h4>Welcome {props.user.displayName}</h4>
                <p>Use the Navigation Bar to the left of the page to get started</p>
            </div>
        );
    }

    //Not Authenticated, ask user to sign in and provide a link
    return <Button onClick={props.authButtonMethod}>Click here to sign in</Button>
}

class Welcome extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.content}>
                <img src={Phonebook_Long} alt="Rainvale Phonebook Logo" className={classes.img}/>
                <p className="lead">
                    This is the company phonebook. Use it to find the contact details of your beloved co-workers.
                </p>
                <WelcomeContent
                    isAuthenticated={this.props.isAuthenticated}
                    user={this.props.user}
                    authButtonMethod={this.props.authButtonMethod} />
            </Paper>
        );
    }
}

export default withStyles(classes)(Welcome)