import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { Container } from 'reactstrap'
import { Container } from '@material-ui/core'
import Welcome from './Components/Welcome'
import ErrorMessage from './Components/ErrorMessage'
import AllContactsView from './Components/Contacts/AllContactsView'
import 'bootstrap/dist/css/bootstrap.css'
import config from './Config';
import { UserAgentApplication } from 'msal';
import { getUserDetails } from './Components/GraphService'
import withMediaQuery from './Components/HOC/withMediaQuery'
import ApplicationBar from './Components/ApplicationBar'
import { createBrowserHistory } from 'history'
import AllOfficeView from './Components/Contacts/AllOfficeView'

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: config.appId,
        authority: config.tenantAuthority,
        redirectUri: config.redirectUri
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    });

    var user = this.userAgentApplication.getAccount();

    var history = createBrowserHistory();

    this.state = {
      isAuthenticated: false,
      user: {},
      error: null,
      history: history,
    };

    if (user) {
      //Enhance user object with data from Graph
      this.getUserProfile()
    }
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        }
      );
      await this.getUserProfile();
    }
    catch(err) {
      var error = {};

      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          {message: errParts[1], debug: errParts[0]} :
          {message: errParts};
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  async getUserProfile() {
    try {
      //Get the access token silently
      //If the cache contains non-expired token, this function
      //will just return the cached token. Otherwise, it will
      //make a request to the Azure OAuth endpoint to get a token.

      var accessToken = await this.userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      if (accessToken) {
        //Temp: Display the token in the error flash
        var user = await getUserDetails(accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null,
          //error: {message:"Access Token", debug: accessToken.accessToken}
        });
      }
    }
    catch(err) {
      var error = {};

      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          {message: errParts[1], debug: errParts[0]} :
          {message: errParts};
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />
    }

    return (
        <Router>
          <div>
            <ApplicationBar
              isAuthenticated={this.state.isAuthenticated}
              authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
              user={this.state.user} />
            <Container>
              {error}
              <Route exact path="/"
                render={(props) => 
                  <Welcome {...props}
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    authButtonMethod={this.login.bind(this)} />
                  } />
                <Route exact path="/people"
                  render={(props) => 
                    <AllContactsView {...props}
                      showError={this.setErrorMessage.bind(this)}
                      user={this.state.user} />
                      } />
                <Route exact path="/offices"
                  render={(props) =>
                    <AllOfficeView {...props}
                      showError={this.setErrorMessage.bind(this)}
                      user={this.state.user} />
                    } />
            </Container>
          </div>
        </Router>
    );
  }
  setErrorMessage(message, debug) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }
}

export default withMediaQuery('(prefers-colour-scheme: dark)')(App);
