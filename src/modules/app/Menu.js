import React from 'react';
import List from '@material-ui/core/List';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import StorageIcon from '@material-ui/icons/Storage';
import { ListItemNavLink } from '../../components/List'


const Menu = () => (

    <List component="nav">
        <ListItemNavLink button exact icon={<StorageIcon />} primary="Dictionary" to="/" />
        <ListItemNavLink button icon={<SpellCheckIcon />} primary="Learn Articles" to="/learning/articles" />
    </List>
)

export default Menu;
