import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default class ContactCardDetail extends Component { 
    render() {
        return (
            <List className={useStyles.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PhoneAndroid />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Mobile Phone" secondary={this.props.contact.mobilePhone} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Work />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work Phone" secondary={this.props.contact.businessPhones} />
                </ListItem>
                <Divider variant="inset" component="li" />
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
