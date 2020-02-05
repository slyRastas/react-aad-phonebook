import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreIcon from '@material-ui/icons/More';
import ContactCardDetail from './ContactCardDetail'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ContactDialogDetail from './ContactDialogDetail'

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
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
      backgroundColor: red[500],
    },
  }));

export default class ContactCard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
        this.state = {
            isExpanded: false,
            isOpen: false
        }
        
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    toggleDialog() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <Card>
                <CardHeader avatar={
                    <Avatar aria-label={this.props.contact.displayName} className={useStyles.avatar}/>
                    }
                    action={
                        <IconButton
                            className={clsx(useStyles.expand, {
                                [useStyles.expandOpen]: this.state.isOpen,
                            })}
                            onClick={this.toggleDialog}
                            aria-expanded={this.state.isOpen}
                            aria-label="show more"
                            >
                                <MoreIcon/>
                            </IconButton>
                    }
                    title={this.props.contact.displayName + " | " + this.props.contact.jobTitle}
                    subheader={this.props.contact.department + " | " + this.props.contact.officeLocation}
                />
                <Dialog open={this.state.isOpen} keepMounted onClose={this.toggleDialog} aria-labelledby='coantact-dialog'>
                    <DialogTitle id={this.props.contact.id} onClose={this.toggleDialog}>
                        {this.props.contact.displayName}
                    </DialogTitle>
                    <DialogContent dividers>
                        <ContactCardDetail contact={this.props.contact}/>
                    </DialogContent>
                </Dialog>
            </Card>
        )
    }
}
