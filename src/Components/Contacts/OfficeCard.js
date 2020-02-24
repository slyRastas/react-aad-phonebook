import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import MoreIcon from '@material-ui/icons/More';
import config from '../../Config';
import { 
  Business,
  Work,
  Email,
  Print, } from '@material-ui/icons'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';

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
      backgroundColor: blue[500],
    },
  });

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class OfficeCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader 
                        avatar={<Business/>} 
                        title={this.props.office.Title}
                        subheader={this.props.office.EMail}/>
                    <Divider/>
                    <CardContent>
                      <List>
                        <ListItemLink href={"tel:" + this.props.office.WorkPhone}>
                          <ListItemAvatar>
                            <Avatar>
                              <Work/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Main Office Number" secondary={this.props.office.WorkPhone} />
                        </ListItemLink>
                        <Divider variant="inset" component="li"/>
                        {(this.props.office.WorkFax !== "") && (
                          <div>
                            <ListItemLink href={"tel:" + this.props.office.WorkFax}>
                              <ListItemAvatar>
                                <Avatar>
                                  <Print/>
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Fax Number" secondary={this.props.office.WorkFax}/>
                            </ListItemLink>
                          </div>
                        )}
                      </List>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(classes)(OfficeCard)