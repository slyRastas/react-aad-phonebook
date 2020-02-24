import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import config from '../../Config';
import { getSharepointListItem } from '../GraphService';
import Grid from '@material-ui/core/Grid'
import OfficeCard from './OfficeCard'

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
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(8)
        }
        //marginLeft: theme.drawerWidth + 1,
      },
  });

class AllOfficeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            offices: [],
        }
    }

    async componentDidMount() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var offices = await getSharepointListItem(accessToken);
            var officesInfo = offices.value.map(x => x.fields)
            //Update the array of contacts in state
            this.setState({
                offices: officesInfo
            });
        }
        catch(err) {
            this.props.showError('ERROR', JSON.stringify(err));
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <Grid container spacing={3}>
                    {this.state.offices.map(
                        function(office){
                            return(
                                <Grid item xs={12} sm={12} md={6} lg={4} key={office.linkTitle}>
                                    <OfficeCard office={office} />
                                </Grid>
                            )
                        }
                    )}
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(AllOfficeView)