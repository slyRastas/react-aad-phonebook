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

export async function getContacts(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const apiString = '/groups/' + config.phonebookGroupId + '/members'

    const contacts = await client
        .api(apiString)
        .select('id,avatar,displayName,mail,userPrincipalName,officeLocation,mobilePhone,businessPhones')
        .get();
    
    return contacts;
}