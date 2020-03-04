import React, { Component } from 'react'
import{
    Button,
    Paper,
    Grid,
    Card,
    CardHeader,
    CircularProgress,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Phonebook_Long from '../Media/Phonebook_Long.png'
import { getSharepointListItems } from './GraphService';
import config from '../Config'

const classes = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            //paddingLeft: theme.spacing(8),
            marginLeft: theme.spacing(8),
        }
    },
    img: {
        height: '64px',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            height: '24px'
        }
    }
  });

function CompanyInfo(props) {
    if (props.isAuthenticated) {
        if (props.loading) {
            return <CircularProgress />
        }
        return (
            <div>
                <Grid container sapcing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4} >
                        <Card>
                            <CardHeader title="test" />
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return <div></div>
}

function WelcomeContent(props) {
    //If Authenticated, greet user
    if (props.isAuthenticated) {
        return (
            <div>
                <h4>Welcome {props.user.displayName}</h4>
                <p>Use the Navigation Bar to the left of the page to get started</p>
            </div>
        );
    }

    //Not Authenticated, ask user to sign in and provide a link
    return <Button onClick={props.authButtonMethod}>Click here to sign in</Button>
}

class Welcome extends Component {
    constructor(props){
        super(props);

        this.state = {
            departmentInfo: [],
            loading: false,
            
        }
    }

    async fetchDepartemntInfo() {
        try {
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });

            var departmentInfo = await getSharepointListItems(accessToken, config.sharepointDepartmentListID)
            
            this.setState({
                departmentInfo: departmentInfo,
                loading: false,
            })
        }
        catch(err) {
            console.log(JSON.stringify(err))
        }
    }

    componentDidMount() {
        console.log("Component Mounted")
        this.setState({
            loading: true,
        })
        console.log("Fetching Department Info")
        this.fetchDepartemntInfo();
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.content}>
                <img src={Phonebook_Long} alt="Rainvale Phonebook Logo" className={classes.img}/>
                <p className="lead">
                    This is the company phonebook. Use it to find the contact details of your beloved co-workers.
                </p>
                <WelcomeContent
                    isAuthenticated={this.props.isAuthenticated}
                    user={this.props.user}
                    authButtonMethod={this.props.authButtonMethod} />
                <CompanyInfo
                    isAuthenticated={this.props.isAuthenticated}
                    loading={this.state.loading} />
            </Paper>
        );
    }
}

export default withStyles(classes)(Welcome)