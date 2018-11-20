import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { shallow, mount } from 'enzyme';
import App from './App';
import store from '../../store'


it('App shalow renders without crashing', () => {
    shallow(<App />);
});

const appComponent = <Provider store={store}><App /></Provider>

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router>{appComponent}</Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('App Navigation', () => {
    it('shoud navigate to Dictionary without crashing', () => {
        const mountedApp = mount(<Router initialEntries={["/"]}>{appComponent}</Router>)
        const main = mountedApp.find('main').find('Route');
        // console.log(main.debug())
        expect(main.text()).toBe('Search Word')
        expect(main.exists('Dictionary')).toEqual(true)
        mountedApp.unmount()
    })

    it('shoud navigate to Dictionary List without crashing', () => {
        const mountedApp = mount(<Router initialEntries={["/dict/words"]}>{appComponent}</Router>)
        const main = mountedApp.find('main').find('Route');
        expect(main.text()).toContain('Dictionary List')
        expect(main.exists('Words')).toEqual(true)
        mountedApp.unmount()
    })

    it('shoud navigate to Learning Articles without crashing', () => {
        const mountedApp = mount(<Router initialEntries={["/learning/articles"]}>{appComponent}</Router>)
        const main = mountedApp.find('main').find('Route');
        expect(main.text()).toContain('Your score')
        expect(main.exists('Articles')).toEqual(true)
        mountedApp.unmount()
    })

});
