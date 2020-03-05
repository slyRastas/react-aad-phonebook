import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import config from '../../Config'
import { getContactsInfo } from '../GraphService'
import '@fortawesome/fontawesome-free/css/all.css'
import ContactCard from './ContactCard';
import { Select, FormControl, MenuItem, InputLabel, Card, CardHeader, CardContent, CircularProgress, Avatar } from '@material-ui/core';
import {Search} from '@material-ui/icons'
import $ from 'jquery';

var sortJsonArray = require('sort-json-array')

const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(4),
      minWidth: '100px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    loading: {
        marginTop: theme.spacing(4)
    },
    formCard: {
        display: 'flex',
    },
    verticalDivider: {
        alignSelf: 'stretch',
        height: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(8)
    }
  });

class AllContactsView extends Component {
    constructor(props) {
        super(props);

        var userInfo = config.userInfo.split(",")

        this.state = {
            contacts: [],
            sort: '',
            filterBy: '',
            filter: '',
            filterOptions: [],
            userInfo: userInfo,
            loading: false,
        };

        this.sortContacts = this.sortContacts.bind(this)
        this.filterContacts = this.filterContacts.bind(this);
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })
        this.getContacts();
    }

    async getContacts() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var contacts = await getContactsInfo(accessToken);
            var sortedContacts = sortJsonArray(contacts.value, this.state.sort)
            //Update the array of contacts in state
            this.setState({
                contacts: sortedContacts,
                loading: false,
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

    loadFilters = event => {
        if (event.target.value !== 'none') {
            var lookup = {};
            var items = this.state.contacts;
            var result = [];
            
            for (var item, i = 0; (item = items[i++]);) {
                var filter = item[event.target.value];
                
                if (!(filter in lookup)) {
                    lookup[filter] = 1;
                    result.push(filter);
                }
            }
            
            this.setState({
                filterBy: event.target.value,
                filterOptions: result,
            })
        }
        else {
            this.getContacts();
            this.setState({
                filterBy: 'none',
                filter: '',
                filterOptions: [],
            })
        }
        
    }

    filterContacts = event => {
        var filterBy = this.state.filterBy;
        var filteredContacts = $.grep( this.state.contacts, function(contact) {
            return contact[filterBy] === event.target.value;
        });

        this.setState({
            filter: event.target.value,
            contacts: filteredContacts,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card className={classes.formCard}>
                        <CardHeader 
                            title="Sort and Filter Options"
                            avatar={
                                <Avatar>
                                    <Search/>
                                </Avatar>
                            }/>
                        <CardContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="sort-by-label">Sort By</InputLabel>
                            <Select
                                className={classes.selectEmpty}
                                labelId="sort-by-label"
                                id="sort-by-select"
                                value={ this.state.sort  }
                                onChange={ this.sortContacts }
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
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filter-by-label">Filter By</InputLabel>
                            <Select
                                className={ classes.selectEmpty }
                                labelId="filter-by-label"
                                id="filter-by-select"
                                value={ this.state.filterBy }
                                onChange={ this.loadFilters }
                            >
                                {
                                    Object.entries(config.filterBy).map(([key, value]) => {
                                        return (
                                            <MenuItem value={key} key={key}>{value}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filter-select-label">Filter</InputLabel>
                            <Select
                                className={ classes.selectEmpty }
                                labelId="filter-select-label"
                                id="filter-select"
                                value={this.state.filter}
                                onChange={this.filterContacts}
                                >
                                    {
                                        this.state.filterOptions.map((location) => {
                                            return (
                                                <MenuItem value={location} key={location}>{location}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                        </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                { (this.state.loading) ? 
                    <Grid container justify="center" className={classes.loading}><CircularProgress/></Grid> :
                    this.state.contacts.map(
                        function(contact){
                            return(
                                <Grid item xs={12} sm={12} md={6} lg={4} key={contact.id}>
                                    <ContactCard contact={contact} key={contact.id}/>
                                </Grid>
                            );
                        }
                    )
                }
            </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(AllContactsView)