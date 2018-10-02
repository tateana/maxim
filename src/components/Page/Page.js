import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
});

const Page = (props) => {
    const { classes, children, ...others } = props;
    return (
        <Paper className={classes.root} {...others}>

            {children}

        </Paper>
    );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(Page);