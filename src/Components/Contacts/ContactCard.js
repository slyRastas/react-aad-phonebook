import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import MoreIcon from '@material-ui/icons/More';
import config from '../../Config';
import { getContactDetail } from '../GraphService';
import ContactDialogDetail from './ContactDialogDetail'

const classes = theme => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
  });

class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
        this.state = {
            isExpanded: false,
            isOpen: false,
            userDetail: [],
        }
        
        this.toggleDialog = this.toggleDialog.bind(this);
        this.fetchUserDetail = this.fetchUserDetail.bind(this);
    }

    async fetchUserDetail() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var userDetail = await getContactDetail(accessToken, this.props.contact.userPrincipalName);
            //Update the array of contacts in state
            this.setState({
                userDetail: userDetail,
                isOpen: !this.state.isOpen
            });
        }
        catch(err) {
            //this.props.showError('ERROR', JSON.stringify(err));
            console.log(JSON.stringify(err))
        }
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    toggleDialog() {
        if(!this.state.isOpen){
            this.fetchUserDetail();
        }
        else{
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
        
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader avatar={
                    <Avatar alt={this.props.contact.displayName} src='/broken.jpg' aria-label={this.props.contact.displayName} className={classes.avatar}/>
                    }
                    action={
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.isOpen,
                            })}
                            onClick={this.toggleDialog}
                            aria-expanded={this.state.isOpen}
                            aria-label="show more"
                            >
                                <MoreIcon/>
                            </IconButton>
                    }
                    title={this.props.contact.displayName}
                    subheader={this.props.contact.department + " | " + this.props.contact.officeLocation}
                />
                <ContactDialogDetail contact={this.props.contact} userDetail={this.state.userDetail} isOpen={this.state.isOpen} toggleDialog={this.toggleDialog}/>
            </Card>
        )
    }
}

export default withStyles(classes)(ContactCard)
