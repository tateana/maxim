import React, { Component } from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Menu from "./Menu"
import Dashboard from "../../components/Dashboard"

import Dictionary from "../dictionary"
import Articles from "../learning"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { aaa: true }
    }

    render() {
        const toolbar = <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
                Maxim Lingvo
            </Typography>
        </Toolbar>;
        return (
            <Dashboard toolbar={toolbar} menu={<Menu />} >
                {<Articles />}
            </Dashboard>
        )
    }
}

export default App;