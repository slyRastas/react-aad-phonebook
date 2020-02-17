import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreIcon from '@material-ui/icons/More';

import ContactDialogDetail from './ContactDialogDetail'

const classes = theme => ({
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
  });

class ContactCard extends Component {
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
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader avatar={
                    <Avatar aria-label={this.props.contact.displayName} className={classes.avatar}/>
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
                <ContactDialogDetail contact={this.props.contact} isOpen={this.state.isOpen} toggleDialog={this.toggleDialog}/>
            </Card>
        )
    }
}

export default withStyles(classes)(ContactCard)
