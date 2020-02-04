import React, { Component } from 'react'
import{
    Button,
    Jumbotron
} from 'reactstrap'

function WelcomeContent(props) {
    //If Authenticated, greet user
    if (props.isAuthenticated) {
        return (
            <div>
                <h4>Welcome {props.user.displayName}</h4>
                <p>Use the Navigation Bar at the top of the page to get started</p>
            </div>
        );
    }

    //Not Authenticated, ask user to sign in and provide a link
    return <Button color="primary" onClick={props.authButtonMethod}>Click here to sign in</Button>
}

export default class Welcome extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Phonebook</h1>
                <p className="lead">
                    This is the company phonebook. Use it to find the contact details of your beloved co-workers.
                </p>
                <WelcomeContent
                    isAuthenticated={this.props.isAuthenticated}
                    user={this.props.user}
                    authButtonMethod={this.props.authButtonMethod} />
            </Jumbotron>
        );
    }
}
