import { map, mapTo, switchMap, mergeMap, withLatestFrom, filter, ignoreElements, throttleTime, tap } from 'rxjs/operators';
import { of, from } from 'rxjs/index';
import { ofType } from 'redux-observable';
import { epicErrorHandler } from '../utils'

import *  as a from './actions';
import * as api from '../api/actions';


const mergeDataToDictionary = (currentDictionary, data) => {
    const dictionary = Object.assign({}, currentDictionary)

    const merge = (item) => {
        if (item === null) {
            return
        }
        dictionary[item.id] = Object.assign({}, dictionary[item.id])
        dictionary[item.id][item.constructor.entityType] = item;
    }

    if (Array.isArray(data)) {
        data.forEach(subData => {
            if (Array.isArray(subData)) {
                subData.forEach(merge)
            } else {
                merge(subData)
            }
        })
    } else {
        merge(data)
    }

    return dictionary
}

let loading = false;
export const loadingStart = action$ => action$.pipe(
    ofType(a.DICTIONARY_LOAD),
    throttleTime(10000),
    tap(() => { loading = true }),
    mapTo(api.fetchAll())
);

export const loadingEnd = action$ => action$.pipe(
    filter(() => loading),
    ofType(a.DICTIONARY_UPDATED),
    tap(() => { loading = false }),
    mapTo({ type: a.DICTIONARY_LOADED })
);

export const updating = (action$, state$) => action$.pipe(
    ofType(a.DICTIONARY_UPDATE, api.FETCH_SERVICES_SUCCESS, api.FETCH_WORD_SUCCESS),
    withLatestFrom(state$),
    map(([action, state]) => ({ type: a.DICTIONARY_UPDATED, payload: mergeDataToDictionary(state.dictionary, action.payload) })),
    epicErrorHandler
);

let findingItem = false;
export const findingItemStart = (action$, state$) => action$.pipe(
    ofType(a.DICTIONARY_ITEM_FIND),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
        if (state.dictionary[action.payload]) {
            return of({ type: a.DICTIONARY_ITEM_FOUND, payload: state.dictionary[action.payload].word.id })
        }
        findingItem = true
        return of(api.fetchDictItem(action.payload))
    }),
    epicErrorHandler
);

export const findingItemProccessing = action$ => action$.pipe(
    filter(() => findingItem),
    ofType(api.FETCH_WORD_SUCCESS),
    tap((action) => { findingItem = action.payload[0].id; }),
    ignoreElements(),
    epicErrorHandler
);

export const findingItemFailEnd = action$ => action$.pipe(
    filter(() => findingItem),
    ofType(api.FETCH_WORD_NOT_FOUND),
    map(() => ({ type: a.DICTIONARY_ITEM_FOUND, payload: false })),
    tap(() => { findingItem = false }),
    epicErrorHandler
);

export const findingItemEnd = action$ => action$.pipe(
    filter(() => findingItem),
    ofType(a.DICTIONARY_UPDATED),
    map(() => ({ type: a.DICTIONARY_ITEM_FOUND, payload: findingItem })),
    tap(() => { findingItem = false }),
    epicErrorHandler
);


let savingItems = false;
export const savingItemsStart = action$ => action$.pipe(
    ofType(a.DICTIONARY_ITEMS_SAVE),
    tap(() => { savingItems = true }),
    map(action => ({ type: a.DICTIONARY_UPDATE, payload: action.payload })),
    epicErrorHandler
);

export const savingItemsProccessing = action$ => action$.pipe(
    filter(() => savingItems),
    ofType(a.DICTIONARY_UPDATED),
    mapTo(a.sync()),
    epicErrorHandler
);

export const savingItemsEnd = action$ => action$.pipe(
    filter(() => savingItems),
    ofType(a.DICTIONARY_SYNCED),
    mapTo({ type: a.DICTIONARY_ITEMS_SAVED }),
    tap(() => { savingItems = false }),
    epicErrorHandler
);


let synchronizing = 0;
export const synchronizingStart = (action$, state$) => action$.pipe(
    ofType(a.DICTIONARY_SYNC),
    withLatestFrom(state$),
    switchMap(([, state]) => from(Object.values(state.dictionary)).pipe(
        mergeMap(entities => from(Object.values(entities))),
        filter(entity => entity && entity.isModified),
        tap(() => { synchronizing += 1 }),
        map(entity => api.saveEntity(entity))
    )),
    epicErrorHandler
);

export const synchronizingEnd = action$ => action$.pipe(
    ofType(api.SAVE_ENTITY_SUCCESS),
    map(action => {
        action.payload.synced()
        synchronizing -= 1
        return action.payload.id
    }),
    filter(() => synchronizing === 0),
    // bufferTime(2000), // 2 seconds
    map(id => ({ type: a.DICTIONARY_SYNCED, payload: id })),
    epicErrorHandler
);
