import React from 'react';
import List from '@material-ui/core/List';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import DictionaryIcon from '@material-ui/icons/LibraryAdd';
import { ListItemNavLink } from '../../components/List'


const Menu = () => (

    <List component="nav">
        <ListItemNavLink button exact icon={<DictionaryIcon />} primary="Dictionary" to="/" />
        <ListItemNavLink button icon={<SpellCheckIcon />} primary="Learn Articles" to="/learning/articles" />
    </List>
)

export default Menu;
