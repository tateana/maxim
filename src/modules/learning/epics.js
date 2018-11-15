import { map, mapTo, mergeMap, withLatestFrom, filter, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/index';
import { ofType } from 'redux-observable';
import _shuffle from 'lodash.shuffle'
import *  as a from './actions';
import *  as dict from '../dictionary/actions';

const selectArticlesToLearn = (dictionary) => {
    const articleTasks = Object.values(dictionary)
        .filter(task => task.articleScore && task.articleScore.count < 5)
        .sort((task1, task2) => (!task1.articleScore.viewed || task1.articleScore.viewed < task2.articleScore.viewed) ? -1 : 1)
        .slice(0, 30)
        .map(task => task.articleScore.id)
    return _shuffle(articleTasks)
}

let loading = false;
export const loadingStart = (action$, state$) => action$.pipe(
    ofType(a.ARTICLES_LOAD),
    withLatestFrom(state$),
    switchMap(([, state]) => {
        if (Object.keys(state.dictionary).length === 0) {
            loading = true
            return of(dict.load())
        }

        return of(
            { type: a.ARTICLES_SET_TOTAL_SCORE, payload: 0 },
            { type: a.ARTICLES_SET_QUESTIONS, payload: selectArticlesToLearn(state.dictionary) },
            { type: a.ARTICLES_LOADED }
        )
    })
);

export const loadingEnd = (action$, state$) => action$.pipe(
    ofType(dict.DICTIONARY_LOADED),
    filter(() => loading),
    withLatestFrom(state$),
    switchMap(([, state]) => of(
        { type: a.ARTICLES_SET_TOTAL_SCORE, payload: 0 },
        { type: a.ARTICLES_SET_QUESTIONS, payload: selectArticlesToLearn(state.dictionary) },
        { type: a.ARTICLES_LOADED })
    ),
    tap(() => { loading = false })
);

let answering = false
export const answeringStart = (action$, state$) => action$.pipe(
    ofType(a.ARTICLES_QUESTION_ANSWER),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
        const newScore = action.payload.clone();
        let totalScore = state.articleTotalScore
        const articleTasks = state.articleTasks.filter(id => id !== action.payload.id);
        if (action.isCorrect) {
            newScore.increment()
            totalScore += 1
        } else {
            newScore.decrement()
            totalScore -= 1
            articleTasks.push(action.payload.id)
        }

        answering = true
        return of(
            dict.updateEntity(newScore),
            { type: a.ARTICLES_SET_TOTAL_SCORE, payload: totalScore },
            { type: a.ARTICLES_SET_QUESTIONS, payload: articleTasks },
        )
    })
);

// TODO fix sync must be after update
export const answeringProccess = action$ => action$.pipe(
    ofType(a.ARTICLES_SET_QUESTIONS),
    filter(() => answering),
    filter((action) => action.payload.length === 0),
    mapTo(dict.sync())
);

export const answeringEnd = action$ => action$.pipe(
    ofType(dict.DICTIONARY_UPDATED),
    filter(() => answering),
    map(() => ({ type: a.ARTICLES_QUESTION_ANSWERED, payload: answering })),
    tap(() => { answering = false })
);