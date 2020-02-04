import React, { Component } from 'react'
import { 
    Card,
    CardTitle,
    CardText,
    CardImg,
    CardBody,
    CardColumns,
    Media
    } from 'reactstrap'
import config from '../Config'
import { getContacts } from './GraphService'
import '@fortawesome/fontawesome-free/css/all.css'
import defaultAvatar from '../Media/user-circle-regular.svg'

function UserAvatar(props) {
    //if user avatar is available, return an img tag with the pic
    if (props.user.avatar) {
        return (
            <CardImg top width="100%" src={props.user.avatar} alt="User Profile"/>
        )
    }
    //No avatar available, return a default icon
    return (<CardImg className="rounded-circle mr-2" style={{width: '50%', 'margin-left': '25%'}} src={defaultAvatar} alt="User Profile"/>);
}

function ContactCard(props) {
    return (
        <Card key={props.contact.id}>
            <UserAvatar user={props.contact}/>
            <CardTitle className="text-center">{props.contact.displayName}</CardTitle>
            <CardBody>
                <Media left href='#'>
                    <i className="fas fa-mobile align-self-center"></i>
                </Media>
                <Media heading>
                    {props.contact.mobilePhone}
                </Media> 
            </CardBody>
        </Card>
    )
}

export default class AllContactsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        };
    }

    async componentDidMount() {
        try {
            //Get user access token.
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            var contacts = await getContacts(accessToken);
            //Update the array of contacts in state
            this.setState({
                contacts: contacts.value
            });
        }
        catch(err) {
            this.props.showError('ERROR', JSON.stringify(err));
        }
    }

    render() {
        return (
            <CardColumns xs="1" sm="2" lg="3">
                {this.state.contacts.map(
                    function(contact){
                        return(
                            <ContactCard contact={contact}/>
                        );
                    }
                )}
            </CardColumns>
            //<pre><code>{JSON.stringify(this.state.contacts, null, 2)}</code></pre>
        );
    }
}
