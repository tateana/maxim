/* eslint no-underscore-dangle: 0 */  // --> OFF


export default class Score {

    constructor(word, count = 0) {
        this._word = word
        this._count = count
    }

    get viewed() {
        if (!this._viewed) {
            this._viewed = new Date()
        }

        return this._viewed
    }

    get count() {
        return this._count
    }

    get word() {
        return this._word
    }

}