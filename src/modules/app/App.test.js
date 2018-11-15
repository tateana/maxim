import React from "react";
import ReactDOM from "react-dom";
import { shallow } from 'enzyme';
import App from './App';

it.skip('shalow renders without crashing', () => {
    shallow(<App />);
});

it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
