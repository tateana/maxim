import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    loading: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -theme.spacing.unit,
        marginLeft: -theme.spacing.unit,
    },
});

const Button = (props) => {
    const { classes, children, loading, disabled, ...others } = props;
    return (
        <MaterialButton className={classes.root} {...others} disabled={loading || disabled}>
            {children}
            {loading && <CircularProgress size={18} className={classes.loading} />}
        </MaterialButton>
    );
}

Button.defaultProps = {
    loading: false
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired,
    loading: PropTypes.bool
};

export default withStyles(styles)(Button);