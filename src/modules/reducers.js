import { combineReducers } from 'redux'
import * as a from './learning/actions'
import * as d from './dictionary/actions'


function dictionary(state = {}, action) {

    if (action.type === d.DICTIONARY_UPDATED) {
        return action.payload
    }

    return state
}

function articleTasks(state = [], action) {
    if (action.type === a.ARTICLES_SET_QUESTIONS) {
        return action.payload
    }

    return state;
}

function articleTotalScore(state = 0, action) {
    if (action.type === a.ARTICLES_SET_TOTAL_SCORE) {
        return action.payload
    }

    return state
}

function dictionaryWord(state = null, action) {

    if (action.type === d.DICTIONARY_ITEM_FOUND) {
        return action.payload
    }

    return state
}


export default combineReducers({
    dictionary,
    articleTasks,
    articleTotalScore,
    dictionaryWord
})