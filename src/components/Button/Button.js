import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import MaterialButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import green from '@material-ui/core/colors/lightGreen';
import orange from '@material-ui/core/colors/orange';

const styles = theme => ({
    loading: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -theme.spacing.unit,
        marginLeft: -theme.spacing.unit,
    },

    success: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
            '&$disabled': {
                background: green[400],
            }
        },
        '&$disabled': {
            background: green[400],
            boxShadow: 'none',
        },
    },

    error: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[600],
            '&$disabled': {
                background: orange[400],
            }
        },
        '&$disabled': {
            background: orange[400],
            boxShadow: 'none',
        },
    },

    disabled: {
        color: orange[600]
    },
});

const Button = (props) => {
    const { classes, children, loading, disabled, state, ...others } = props;
    return (
        <MaterialButton className={classes[state]} classes={{ disabled: classes.disabled }} {...others} disabled={loading || disabled}>
            {children}
            {loading && <CircularProgress size={18} className={classes.loading} />}
        </MaterialButton>
    );
}

Button.defaultProps = {
    loading: false,
    state: 'none'
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired,
    loading: PropTypes.bool,
    state: PropTypes.oneOf(['error', 'success', 'none'])
};

export default withStyles(styles)(Button);