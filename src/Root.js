import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";

import App from "./modules/app";

const Root = () => (
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                < App />
            </React.StrictMode>
        </Router>
    </Provider>
)

export default Root;

