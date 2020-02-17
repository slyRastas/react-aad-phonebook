import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContactCardDetail from './ContactCardDetail';


export default class ContactDialogDetail extends Component {   
    render() {
        return (
            <Dialog open={this.props.isOpen} keepMounted onClose={this.props.toggleDialog} aria-labelledby='contact-dialog'>
                <DialogTitle id={this.props.contact.id}>
                    {this.props.contact.displayName}
                </DialogTitle>
                <DialogContent dividers>
                    <ContactCardDetail contact={this.props.userDetail}/>
                </DialogContent>
            </Dialog> 
        )
    }
}

