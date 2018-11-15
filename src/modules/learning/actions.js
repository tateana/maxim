export const ARTICLES_LOAD = 'ARTICLES_LOAD';
export const ARTICLES_LOADED = 'ARTICLES_LOADED';

export const ARTICLES_QUESTION_ANSWER = 'ARTICLES_QUESTION_ANSWER';
export const ARTICLES_QUESTION_ANSWERED = 'ARTICLES_QUESTION_ANSWERED';

export const ARTICLES_SET_QUESTIONS = 'ARTICLES_SET_QUESTIONS';
export const ARTICLES_SET_TOTAL_SCORE = 'ARTICLES_SET_TOTAL_SCORE';


export function load() {
    return {
        type: ARTICLES_LOAD,
    }
}

export function answer(oldScore, isCorrect) {
    return {
        type: ARTICLES_QUESTION_ANSWER,
        payload: oldScore,
        isCorrect
    }
}