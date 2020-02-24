import React, { Component } from 'react'
import config from '../../Config';
import { getSharepointListItem } from '../GraphService';



export default class AllOfficeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            offices: null,
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
        return (
            <div>
                
            </div>
        )
    }
}
