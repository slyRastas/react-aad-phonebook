import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import MoreIcon from '@material-ui/icons/More';
import config from '../../Config';
import { Business } from '@material-ui/icons'

const classes = theme => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[500],
    },
  });

class OfficeCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader 
                        avatar={<Business/>} 
                        title={this.props.office.Title}
                        subheader={this.props.office.EMail}/>

                </Card>
            </div>
        )
    }
}

export default withStyles(classes)(OfficeCard)