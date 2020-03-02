import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import config from '../../Config';
import { 
  Business,
  Work,
  Print,
  EmojiPeople } from '@material-ui/icons'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import { lookupSharepointUser, getContactDetail } from '../GraphService';
import FormattedAddress from './FormattedAddress'
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
      backgroundColor: blue[500],
    },
    content: {
      flexGrow: 1,
    },
    cards: {
      padding: theme.spacing(2),
    }
  });

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}



class OfficeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: [],
      address: {},
      isOpen: false,
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

  async componentDidMount() {
    try {
        //Get user access token.
        var accessToken = await window.msal.acquireTokenSilent({
            scopes: config.scopes
        });
        var siteContact = await lookupSharepointUser(accessToken, config.sharepointUserListID, this.props.office.Site_x0020_ContactLookupId);
        var contact = await getContactDetail(accessToken, siteContact.EMail);
        //Update the array of contacts in state
        this.setState({
            contact: contact,
            address: {
              streetAddress: this.props.office.Location,
              city: this.props.office.WorkCity,
              state: this.props.office.WorkState,
              postalCode: this.props.office.WorkZip,
            }
        });
    }
    catch(err) {
        //this.props.showError('ERROR', JSON.stringify(err));
        console.log(JSON.stringify(err))
    }

    
}

    render() {
      const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader 
                        avatar={<Business/>} 
                        title={this.props.office.Title}
                        subheader={this.props.office.Functions.join(' | ')}
                        action={
                          <Button
                              className={clsx(classes.expand, {
                                  [classes.expandOpen]: this.state.isOpen,
                              })}
                              onClick={this.toggleDialog}
                              aria-expanded={this.state.isOpen}
                              aria-label="show more"
                              >
                                  <Avatar>
                                    <EmojiPeople/>
                                  </Avatar>
                              </Button>
                        }
                        />
                    <ContactDialogDetail contact={this.state.contact} userDetail={this.state.contact} isOpen={this.state.isOpen} toggleDialog={this.toggleDialog}/>
                    <Divider/>
                    <CardContent className={classes.cards}>
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
                        <Divider variant="inset" component="li"/>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Business />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Street Address" secondary={<FormattedAddress address={this.state.address}/>} component={'span'}/>
                        </ListItem>                       
                      </List>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(classes)(OfficeCard)