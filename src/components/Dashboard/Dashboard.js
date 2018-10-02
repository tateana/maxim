import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    drawer: {
        position: 'relative',
    },

    main: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    }
});

const Dashboard = (props) => {
    const { classes, children, toolbar, menu } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" className={classes.layout}>
                {toolbar}
            </AppBar>
            <div className={classNames(classes.root, classes.layout)}>
                <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
                    {menu}
                </Drawer>
                <main className={classes.main}>
                    {children}
                </main>
            </div>
        </React.Fragment >
    );
}

Dashboard.propTypes = {
    children: PropTypes.node.isRequired,
    toolbar: PropTypes.node.isRequired,
    menu: PropTypes.node.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(Dashboard);