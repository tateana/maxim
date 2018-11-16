import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import 'core-js/fn/object/values'
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
