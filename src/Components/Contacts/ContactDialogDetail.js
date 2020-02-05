import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';



import ContactCardDetail from './ContactCardDetail';

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
    render() {
        return (
            <Dialog onClose={this.props.toggleDialog} aria-labelledby='coantact-dialog' open={this.props.isOpen}>
                <DialogTitle id={this.props.contact.id} onClose={this.props.handleClose}>
                    {this.props.contact.displayName}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ContactCardDetail contact={this.props.contact}/>
                        </Grid>
                        <Grid item>
                            <FromattedAddress address={this.props.contact.address} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog> 
        )
    }
}

