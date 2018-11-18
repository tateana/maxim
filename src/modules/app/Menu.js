import React from 'react';
import List from '@material-ui/core/List';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import DictionaryIcon from '@material-ui/icons/LibraryAdd';
import SearchIcon from '@material-ui/icons/Search';
import { ListItemNavLink } from '../../components/List'


const Menu = () => (

    <List component="nav">
        <ListItemNavLink button exact icon={<SearchIcon />} primary="Dictionary search" to="/" />
        <ListItemNavLink button icon={<DictionaryIcon />} primary="Dictionary list" to="/dict/words" />
        <ListItemNavLink button icon={<SpellCheckIcon />} primary="Learn articles" to="/learning/articles" />
    </List>
)

export default Menu;
