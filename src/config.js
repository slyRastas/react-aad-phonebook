module.exports = {
    appId: '<APP_ID_SET_IN_AZURE>',
    tenantAuthority: 'https://login.microsoftonline.com/<YOUR_AZURE_TENANT>',
    redirectUri: '<URL_REDIRECT>',
    scopes: [
        'user.read',
        'calendars.read',
        'directory.accessasuser.all',
        'sites.read.all'
    ],
    phonebookGroupId: '<AAD_SECURITY_GROUP',
    userInfo: 'id,avatar,displayName,userPrincipalName,department,officeLocation',
    userDetails: 'id,displayName,department,jobTitle,mail,userPrincipalName,officeLocation,mobilePhone,businessPhones,streetAddress,city,state,postalCode',
    userInfoStrings: {
        'displayName': 'Name',
        'department': 'Department',
        'jobTitle': 'Job Title',
        'userPrincipalName': 'Email',
        'officeLocation': 'Branch',
        'mobilePhone': 'Mobile Phone',
        'businessPhone': 'Phone Number'
    },
    officesSharepointListID: '<SHAREPOINT_LIST_UID>',
    sharepointUserListID: '<SHAREPOINT_LIST_UID>',
    sharepointDepartmentListID: '<SHAREPOINT_LIST_UID>',
    sharepointCompanyInfoListID: '<SHAREPOINT_LIST_UID>',
}
