import config from '../Config'
var graph = require('@microsoft/microsoft-graph-client')

function getAuthenticatedClient(accessToken) {
    //Initiate Graph client
    const client = graph.Client.init({
        //Use the provided access token to authenticate requests
        authProvider: (done) => {
            done(null, accessToken.accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
}

export async function getContactsInfo(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const apiString = '/groups/' + config.phonebookGroupId + '/members'

    const contactsInfo = await client
        .api(apiString)
        .select(config.userInfo)
        .get();

    
    return contactsInfo;
}

export async function getContactDetail(accessToken, contactId) {
    const client = getAuthenticatedClient(accessToken);

    const apiString = '/users/' + contactId;

    const contactDetail = await client
        .api(apiString)
        .select(config.userDetails)
        .get()

    return contactDetail
}

export async function getSharepointListItem(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const apiString = '/sites/root/lists/' + config.officesSharepointListID + '/items';

    const officesInfo = await client
        .api(apiString)
        .expand("fields")
        .get()

    return officesInfo
}