/* eslint no-underscore-dangle: 0 */  // --> OFF


export default class Score {

    static _entityType = 'articleScore'

    constructor(word, count = 0) {
        this._word = word
        this._count = count
        this._viewed = null;
        this._isModified = false;
    }

    static get entityType() {
        return Score._entityType;
    }

    get id() {
        return this._word
    }

    get viewed() {
        return this._viewed
    }

    get count() {
        return this._count
    }

    get word() {
        return this._word
    }

    get isModified() {
        return this._isModified
    }

    doModified() {
        this._isModified = true
        console.log('score', this._isModified)
    }

    synced() {
        this._isModified = false
        return this;
    }

    decrement() {
        this._count = 0
        this.view()
        this._isModified = true;
        return this._count;
    }

    increment() {
        this._count += 1;
        this.view()
        this._isModified = true;
        return this._count;
    }

    view() {
        this._viewed = new Date()
    }

    clone() {
        const newScore = new Score(this.word, this.count);
        newScore._viewed = this._viewed;
        return newScore;
    }
}