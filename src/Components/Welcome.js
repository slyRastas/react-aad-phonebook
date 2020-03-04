import React, { Component } from 'react'
import{
    Button,
    Paper,
    Grid,
    Card,
    CardHeader,
    CircularProgress,
    Divider,
    CardContent,
    List,
    ListItemAvatar,
    ListItem,
    Avatar,
    ListItemText,
    Typography,
} from '@material-ui/core'
import { 
    Email,
    Phone,
    Language,
    Work,
    AccountBalance,
    Info,
 } from '@material-ui/icons'
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
    },
    mainDivider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    }
  });

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

function CompanyInfo(props) {
    if (props.isAuthenticated) {
        if (props.loading) {
            return <Grid container justify="center"><CircularProgress /></Grid>
        }
        return (
            <div className={classes.content}>
                <Grid container spacing={3}>
                    {props.departmentInfo.map(
                        function(department){
                            return(
                                <Grid item xs={12} sm={12} md={6} lg={4} key={department.id} >
                                    <Card >
                                        <CardHeader title={department.Title} />
                                        <Divider/>
                                        <CardContent>
                                            <List>
                                                <ListItemLink href={"mailto:" + department.EMail}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <Email/>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={"Email Address"} secondary={department.EMail} />
                                                </ListItemLink>
                                                <Divider variant="inset" component="li"/>
                                                {(department.WorkPhone) && (
                                                <div>
                                                    <ListItemLink href={"tel:" + department.WorkPhone}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <Phone/>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Phone Number" secondary={department.WorkPhone}/>
                                                    </ListItemLink>
                                                </div>
                                                )}
                                                {(department.WebPage) && (
                                                    <div>
                                                        <Divider variant="inset" component="li"/>
                                                        <ListItemLink href={department.WebPage.Url}>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <Language/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={department.WebPage.Description} />
                                                        </ListItemLink>
                                                    </div>
                                                )}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        }
                    )}
                    <Grid item xs={12} sm={12} md={6} lg={4} >
                        <Card>
                            <CardHeader title="Company Info" />
                            <Divider/>
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Work/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="ABN" secondary={props.companyInfo.ABN} />
                                    </ListItem>
                                    <Divider variant="inset" component="li"/>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountBalance/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Account Details" secondary={
                                            <span>
                                                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{"Bank: " + props.companyInfo.bankName}</Typography>
                                                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{"BSB: " + props.companyInfo.bankBsb}</Typography>
                                                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{"ACC: " + props.companyInfo.bankAcc}</Typography>
                                            </span>
                                        } />
                                    </ListItem>
                                    <Divider variant="inset" component="li"/>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Info/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Licence Details" secondary={
                                            <span>
                                                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{"QBCC: " + props.companyInfo.qbccLicenceNum}</Typography>
                                                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{"NSW Fair Trading: " + props.companyInfo.nswFairTradingLicenceNum}</Typography>
                                            </span>
                                        } />
                                    </ListItem>
                                </List>
                            </CardContent>
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
            companyInfo: [],
            loadingCompany: true,
            loadingDepartments: false,
        }
    }

    async fetchCompanyInfo() {
        try {
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });

            var companyInfo = await getSharepointListItems(accessToken, config.sharepointCompanyInfoListID)

            this.setState({
                companyInfo: companyInfo[0],
                loadingCompany: false,
            })
        }
        catch(err) {
            console.log(err)
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
                loadingDepartments: false,
            })
        }
        catch(err) {
            console.log(JSON.stringify(err))
        }
    }

    componentDidMount() {
        console.log("Component Mounted")
        this.setState({
            loadingDepartments: true,
            loadingCompany: true
        })
        console.log("Fetching Department Info")
        this.fetchDepartemntInfo();
        this.fetchCompanyInfo();
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
                <Divider className={classes.mainDivider} />
                <CompanyInfo
                    isAuthenticated={this.props.isAuthenticated}
                    loading={(this.state.loadingCompany | this.state.loadingDepartments)}
                    departmentInfo={this.state.departmentInfo} 
                    companyInfo={this.state.companyInfo}/>
            </Paper>
        );
    }
}

export default withStyles(classes)(Welcome)