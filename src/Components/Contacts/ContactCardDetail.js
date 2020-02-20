import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { PhoneAndroid,
         Work,
         Email,
         Business } from '@material-ui/icons'
import Divider from '@material-ui/core/Divider';
import FormattedAddress from './FormattedAddress'

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function checkArray(prop) {
    if (prop !== undefined && prop.length > 0) {
        return true;
    }
    else {return false};
}

class ContactCardDetail extends Component { 
    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                { (this.props.contact.mobilePhone !== null) && (
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneAndroid />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Mobile Phone" secondary={this.props.contact.mobilePhone} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )}
                { (checkArray(this.props.contact.businessPhones)) && (
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Work />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work Phone" secondary={this.props.contact.businessPhones} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )}
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Email />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.contact.userPrincipalName} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Business />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.contact.department} secondary={<FormattedAddress contact={this.props.contact}/>} component={'span'}/>
                </ListItem>
            </List>
        )
    }
}

export default withStyles(useStyles)(ContactCardDetail)
