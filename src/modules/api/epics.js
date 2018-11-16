import { catchError, mergeMap, map, switchMap } from 'rxjs/operators';
import { zip, of } from 'rxjs/index';
import { ofType } from 'redux-observable';
import * as a from './actions';
import ArticleService from './ScoreService'
import NounService from './NounService'
import YandexService from './yandexService'
import { epicErrorHandler } from '../utils'


export const fetchServices = action$ => action$.pipe(
    ofType(a.FETCH_SERVICES),
    switchMap(action => zip(...action.payload.map(service => service.fetchAll(1000))).pipe(
        map(result => ({
            type: a.FETCH_SERVICES_SUCCESS,
            payload: result
        })),
        catchError(error => of({
            type: a.FETCH_SERVICES_FAILED,
            payload: error,
            error: true
        }))
    )),
    epicErrorHandler
);


export const saveEntity = action$ => action$.pipe(
    ofType(a.SAVE_ENTITY),
    mergeMap(action => action.service.add(action.payload).pipe(
        map(() => ({
            type: a.SAVE_ENTITY_SUCCESS,
            payload: action.payload
        })),
        catchError(error => of({
            type: a.SAVE_ENTITY_FAILED,
            payload: error,
            error: true,
            entity: action.payload
        }))
    )),
    epicErrorHandler
);


export const fetchDictItem = action$ => action$.pipe(
    ofType(a.FETCH_WORD),
    switchMap(action => NounService.fetchExact(action.payload).pipe(
        switchMap(word => {
            if (word) {
                return zip(of(word), ArticleService.fetchExact(word.id))
            }

            return YandexService.find(action.payload)
        }),
        map(wordData => {
            if (!wordData) {
                return { type: a.FETCH_WORD_NOT_FOUND, payload: action.payload }
            }

            let payload = wordData
            if (!Array.isArray(wordData)) {
                payload = [wordData]
            }

            return {
                type: a.FETCH_WORD_SUCCESS,
                payload
            }
        }),
        catchError(errorObject => of({
            type: a.FETCH_WORD_FAILED,
            payload: errorObject.message,
            error: true
        })),
    )),
    epicErrorHandler
);
