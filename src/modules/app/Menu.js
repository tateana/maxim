import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import StorageIcon from '@material-ui/icons/Storage';

export default () => (
    <List component="nav">
        <ListItem button>
            <ListItemIcon>
                <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Dictionary" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SpellCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Learn Articles" />
        </ListItem>
    </List>
)
