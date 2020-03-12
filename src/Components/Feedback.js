import React, { Component } from 'react'

const iframe = '<iframe title="Feedback" width="1280px" height= "960px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=xgYkIIsn6EeehDp66zvdJbkyZfn_1AFHuzIOBCKCR91UODJVWjdZVERUUFpURlhHQzZVRlFSNTk0Mi4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>'

export default class Feedback extends Component {
    
    
    iframe() {
        return {
            __html: iframe
        }
    };
    
    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={ this.iframe() } />
            </div>
        )
    }
}
