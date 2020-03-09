import React, { Component } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import config from '../Config';

const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(4),
      minWidth: '100px',
      display: 'inline-block',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      minWidth: '110px',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
      },
    loading: {
        marginTop: theme.spacing(2)
    },
    formCard: {
        display: 'flex',
    },
    verticalDivider: {
        alignSelf: 'stretch',
        height: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(8)
    }
  });

class FilterButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }

    }

    handleChange = event => {
        const value = event.target.value;
        this.props.filterContacts(this.props.filterBy, value);

        this.setState({
            value: value,
        });
    }

    clearFilter() {
        this.setState({
            value: '',
        })
    }

    componentDidUpdate(prevProps) {
        if(!this.props.filterSet & (this.props.filterSet !== prevProps.filterSet)) {
            this.setState({
                value: '',
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={ classes.formControl }>
                <InputLabel id={"filter-by-" + this.props.filterBy + "-label"}>{config.filterBy[this.props.filterBy]}</InputLabel>
                <Select
                    className={ classes.selectEmpty }
                    labelId={"filter-by-" + this.props.filterBy + "-label"}
                    id={"filter-by-" + this.props.filterBy}
                    value={ this.props.filterSet ? this.state.value : '' }
                    onChange={ this.handleChange }
                    autoWidth
                    >
                        {
                            Object.entries(this.props.filterOptions).map((option) => {
                                return (
                                    <MenuItem value={option[1]} key={option[1]}>{option[1]}</MenuItem>
                                )
                            })
                        }
                    </Select>
            </FormControl>
        );
    }
}

export default withStyles(useStyles)(FilterButton)
