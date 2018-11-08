import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import App from "./modules/app";

const Root = () => (
    <Provider store={store}>
        < App />
    </Provider>
)

export default Root;

