import React, { Component } from 'react'
import { Typography } from '@material-ui/core';

export default class FormattedAddress extends Component {
    render() {
        return (
            <span>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{this.props.contact.streetAddress}</Typography>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{this.props.contact.city}</Typography>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{`${this.props.contact.state} ${this.props.contact.postalCode}`}</Typography>
            </span>
        )
    }
}
