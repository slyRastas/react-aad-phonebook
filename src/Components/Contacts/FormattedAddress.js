import React, { Component } from 'react'
import { Typography } from '@material-ui/core';

export default class FormattedAddress extends Component {
    render() {
        return (
            <span>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{this.props.address.streetAddress}</Typography>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{this.props.address.city}</Typography>
                <Typography variant="inherit" style={{display: 'block'}} component={'span'}>{`${this.props.address.state} ${this.props.address.postalCode}`}</Typography>
            </span>
        )
    }
}
