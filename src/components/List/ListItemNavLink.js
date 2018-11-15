import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'

const styles = (theme) => ({
    'root': {
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        }
    },

    'selected': {
        cursor: 'default',
        '&, &:hover': {
            backgroundColor: theme.palette.action.disabledBackground
        }
    }
});


const ListItemNavLink = (props) => {

    const renderLink = itemProps => <NavLink to={props.to} activeClassName={props.classes.selected}  {...itemProps} />;

    const { icon, primary, secondary } = props;
    return (
        <li>
            <ListItem button component={renderLink} {...props}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText inset primary={primary} secondary={secondary} />
            </ListItem>
        </li>
    );
}

export default withStyles(styles)(ListItemNavLink);
