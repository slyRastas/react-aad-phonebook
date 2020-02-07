import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import config from '../../Config'
import { getContactsInfo } from '../GraphService'
import '@fortawesome/fontawesome-free/css/all.css'
import ContactCard from './ContactCard';
import { Jumbotron } from 'reactstrap';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
//import { sortJsonArray } from 'sort-json-array';

var sortJsonArray = require('sort-json-array')

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default class AllContactsView extends Component {
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

    render() {
        return (
            <div>
            <Jumbotron>
                <FormControl className={useStyles.formControl}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        id="sort-by-select"
                        value={ config.userInfoStrings[this.state.sort].values }
                        onChange={this.sortContacts}
                        >
                            {config.userInfoStrings.map(
                                function(sortBy){
                                    return(
                                        <MenuItem value={sortBy.key} key={sortBy.key}>{sortBy.value}</MenuItem>
                                    );
                                }
                            )}
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
            //<pre><code>{JSON.stringify(this.state.contacts, null, 2)}</code></pre>
        );
    }
}
