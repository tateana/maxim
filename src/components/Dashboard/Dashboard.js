import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuClosedIcon from '@material-ui/icons/Menu';
import MenuOpenedIcon from '@material-ui/icons/ArrowUpward';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import Collapse from '@material-ui/core/Collapse';

import Page from '../Page';

const styles = theme => ({
    root: {
        display: 'flex',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up('md')]: {
            width: theme.breakpoints.values.md,
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
    },

    toggler: {
        color: 'white',
    }
});

class Dashboard extends React.Component {

    state = {
        isOpen: false,
    };

    handleDrawerOpen = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    handleDrawerClose = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { classes, children, toolbar, menu } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative" className={classes.layout}>
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton className={classes.toggler} aria-label="Menu" onClick={this.handleDrawerOpen}>
                                {this.state.isOpen ? <MenuOpenedIcon /> : <MenuClosedIcon />}
                            </IconButton>
                        </Hidden>
                        {toolbar}
                    </Toolbar>
                </AppBar>
                <div className={classNames(classes.root, classes.layout)}>
                    <Hidden smDown>
                        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
                            {menu}
                        </Drawer>
                    </Hidden>
                    <main className={classes.main}>
                        <Hidden mdUp>
                            <Collapse in={this.state.isOpen} component={Page}>
                                {menu}
                            </Collapse>
                        </Hidden>
                        {children}
                    </main>
                </div>
            </React.Fragment >
        );
    }
}

Dashboard.propTypes = {
    children: PropTypes.node.isRequired,
    toolbar: PropTypes.node.isRequired,
    menu: PropTypes.node.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(Dashboard);