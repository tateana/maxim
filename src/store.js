import { applyMiddleware, compose } from 'redux'
import { createStore } from 'redux-dynamic-reducer'
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import rootReducer from './modules/reducers'

import * as articleEpics from './modules/learning/epics';
import * as apiEpic from './modules/api/epics';
import * as dictionaryEpic from './modules/dictionary/epics';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const epics = [
    ...Object.values(apiEpic),
    ...Object.values(dictionaryEpic),
    ...Object.values(articleEpics),
];

export const epic$ = new BehaviorSubject(combineEpics(...epics));
const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap(epic => epic(action$, state$))
);

// const rootEpic = combineEpics(...epics);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware)
    )
)

epicMiddleware.run(rootEpic);

export default store