import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import config from '../../Config'
import { getContactsInfo } from '../GraphService'
import '@fortawesome/fontawesome-free/css/all.css'
import ContactCard from './ContactCard';
import { Select, FormControl, MenuItem, InputLabel, Card, CardHeader, CardContent, CircularProgress, Avatar, Button } from '@material-ui/core';
import {Search} from '@material-ui/icons'
import $ from 'jquery';
import FilterButton from '../FilterButton'

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

        var filter = {...config.filterBy}

        this.state = {
            contacts: [],
            sort: '',
            filter: filter,
            filterSet: false,
            userInfo: userInfo,
            loading: false,
        };

        this.sortContacts = this.sortContacts.bind(this)
        this.filterContacts = this.filterContacts.bind(this);
        this.findUnique = this.findUnique.bind(this);
        this.getContacts = this.getContacts.bind(this);
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })
        await this.getContacts();
        this.loadFilters();
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
                filterSet: false,
            });
        }
        catch(err) {
            //this.props.showError('ERROR', JSON.stringify(err));
            console.log(err);
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

    loadFilters() {
        var filterBy = this.state.filter;
        Object.keys(filterBy).forEach((key) => {
            var options = this.findUnique(this.state.contacts, key)
            filterBy[key] = options;
        })
        this.setState({
            filter: filterBy,
        })
    }

    filterContacts(filterBy, value) {
        var filteredContacts = $.grep( this.state.contacts, function(contact) {
            return contact[filterBy] === value;
        });

        this.setState({
            contacts: filteredContacts,
            filterSet: true,
        })
    }

    findUnique(items, target) {
        var lookup = {};
        //var items = this.state.contacts;
        var result = [];
        
        for (var item, i = 0; (item = items[i++]);) {
            var filter = item[target];
            
            if (!(filter in lookup)) {
                lookup[filter] = 1;
                result.push(filter);
            }
        }
    
        return result;
    }

    render() {
        const { classes } = this.props;
        const _this = this;
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
                                        );
                                    }) 
                                }
                            </Select>
                        </FormControl>
                        {Object.entries(this.state.filter).map(
                            function(filter){
                                return( <FilterButton 
                                            key={filter[0]} 
                                            filterSet={_this.state.filterSet} 
                                            filterBy={filter[0]} 
                                            filterOptions={filter[1]} 
                                            filterContacts={_this.filterContacts}
                                            />
                                );
                            }
                        )
                        }
                        <FormControl className={classes.formControl}>
                            <Button 
                                id="clear-filters"
                                onClick={this.getContacts}
                            >
                                Clear Filters
                            </Button>
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