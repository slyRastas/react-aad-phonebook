import React, { Component } from 'react'
import {
    Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { withStyles } from '@material-ui/core/styles'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const classes = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    }
})
class ErrorMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: (this.props.error !== null),
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        return (
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClick}>
                <Alert onClose={this.handleClick} severity="error">
                    {this.props.message + ": " + this.props.debug}
                </Alert>
            </Snackbar>
        );
    }
}

export default withStyles(classes)(ErrorMessage)
