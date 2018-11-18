import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Menu from "./Menu"
import Dashboard from "../../components/Dashboard"

import Dictionary, { Words } from "../dictionary"
import Articles from "../learning"
import Error404 from "./Error404"

const App = () => {
    const toolbar = <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
            Maxim Lingvo
        </Typography>
    </Toolbar>;
    return (
        <Router>
            <Dashboard toolbar={toolbar} menu={<Menu />} >
                <Switch>
                    <Route exact path="/" component={Dictionary} />
                    <Route path="/dict/words" component={Words} />
                    <Route path="/learning/articles" component={Articles} />
                    <Route component={Error404} />
                </Switch>
            </Dashboard>
        </Router>
    )
}

export default App;