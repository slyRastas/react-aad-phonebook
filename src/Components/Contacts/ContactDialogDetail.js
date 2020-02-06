import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContactCardDetail from './ContactCardDetail';
import config from '../../Config';
import { getContactDetail } from '../GraphService';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
  },
}));

export default class ContactDialogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            userDetail: []
        }

        //this.props.toggleDialog = this.props.toggleDialog.bind(this);
        this.fetchUserDetail = this.fetchUserDetail.bind(this);
    }

    async fetchUserDetail() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var userDetail = await getContactDetail(accessToken, this.props.contact.id);
            //Update the array of contacts in state
            this.setState({
                userDetail: userDetail
            });
        }
        catch(err) {
            //this.props.showError('ERROR', JSON.stringify(err));
            console.log(JSON.stringify(err))
        }
    }    

    render() {
        return (
            <Dialog open={this.props.isOpen} onEnter={this.fetchUserDetail} keepMounted onClose={this.props.toggleDialog} aria-labelledby='contact-dialog'>
                <DialogTitle id={this.props.contact.id} onClose={this.toggleDialog}>
                    {this.props.contact.displayName}
                </DialogTitle>
                <DialogContent dividers>
                    <ContactCardDetail contact={this.state.userDetail}/>
                </DialogContent>
            </Dialog> 
        )
    }
}

