import articleService, { spellScoreService } from './ScoreService'
import wordService from './NounService'
import ArticleScore, { SpellScore } from './Entity/Score';
import Word from './Entity/Word';

export const FETCH_SERVICES = 'FETCH_SERVICES';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_FAILED = 'FETCH_SERVICES_FAILED';


export const SAVE_ENTITY = 'SAVE_ENTITY'
export const SAVE_ENTITY_SUCCESS = 'SAVE_ENTITY_SUCCESS'
export const SAVE_ENTITY_FAILED = 'SAVE_ENTITY_FAILED'

export const FETCH_ARTICLE_SCORES = 'FETCH_ARTICLE_SCORES';
export const FETCH_SPELING_SCORES = 'FETCH_SPELING_SCORES';
export const FETCH_NOUNS = 'FETCH_SPELING_SCORES';


export const FETCH_WORD = 'FETCH_WORD';
export const FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
export const FETCH_WORD_NOT_FOUND = 'FETCH_WORD_NOT_FOUND';
export const FETCH_WORD_FAILED = 'FETCH_WORD_FAILED';


function fetchServices(services) {
    return {
        type: FETCH_SERVICES,
        payload: services
    }
}

export function fetchAll() {
    return fetchServices([articleService, wordService, spellScoreService])
}

export function fetchArticles() {
    return fetchServices([articleService])
}

export function fetchNouns() {
    return fetchServices([wordService])
}

export function saveEntity(entity) {
    let service;
    if (entity instanceof Word) {
        service = wordService
    } else if (entity instanceof SpellScore) {
        service = spellScoreService
    } else if (entity instanceof ArticleScore) {
        service = articleService
    }

    return {
        type: SAVE_ENTITY,
        payload: entity,
        service
    }
}

export function fetchDictItem(item) {
    return {
        type: FETCH_WORD,
        payload: item
    }
}