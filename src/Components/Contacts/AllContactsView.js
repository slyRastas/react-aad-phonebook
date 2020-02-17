import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import config from '../../Config'
import { getContactsInfo } from '../GraphService'
import '@fortawesome/fontawesome-free/css/all.css'
import ContactCard from './ContactCard';
import { Jumbotron } from 'reactstrap';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';


var sortJsonArray = require('sort-json-array')

const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '100px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

class AllContactsView extends Component {
    constructor(props) {
        super(props);

        var userInfo = config.userInfo.split(",")

        this.state = {
            contacts: [],
            sort: 'displayName',
            userInfo: userInfo
        };

        this.sortContacts = this.sortContacts.bind(this)
    }

    async componentDidMount() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var contacts = await getContactsInfo(accessToken);
            var sortedContacts = sortJsonArray(contacts.value, this.state.sort)
            //Update the array of contacts in state
            this.setState({
                contacts: sortedContacts
            });
        }
        catch(err) {
            this.props.showError('ERROR', JSON.stringify(err));
        }
    }

    sortContacts = event => {
        var sortedContacts = sortJsonArray(this.state.contacts, event.target.value)
        //Update the array of contacts in state
        this.setState({
            sort: event.target.value,
            contacts: sortedContacts
        });
    }

    filters = Object.getOwnPropertyDescriptor(config, "userInfoStrings").value

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Jumbotron>
                <FormControl className={classes.formControl}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                        className={useStyles}
                        labelId="sort-by-label"
                        id="sort-by-select"
                        value={ Object.entries(config.userInfoStrings)[this.state.sort]  }
                        onChange={this.sortContacts}
                        >
                            {
                            Object.entries(config.userInfoStrings).map(([key, value]) => {
                                return(
                                    <MenuItem value={key} key={key}>{value}</MenuItem>
                                )
                            }) 
                            }

                        </Select>
                </FormControl>
            </Jumbotron>
            <Grid container spacing={3}>
                {this.state.contacts.map(
                    function(contact){
                        return(
                            <Grid item sm={12} md={6} lg={4} key={contact.id}>
                                <ContactCard contact={contact} key={contact.id}/>
                            </Grid>
                        );
                    }
                )}
            </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(AllContactsView)