import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import App from "./modules/app";

const Root = () => (
    <Provider store={store}>
        <React.StrictMode>
            < App />
        </React.StrictMode>
    </Provider>
)

export default Root;

