/* eslint no-underscore-dangle: 0 */  // --> OFF
import Entity from './Entity'

export default class Score extends Entity {

    static _entityType = 'articleScore'

    constructor(id, count = 0, viewed = null) {
        super(id)
        this._count = count
        this._viewed = viewed;
    }

    get viewed() {
        return this._viewed
    }

    get humanViewed() {
        return this.constructor.dateToString(this._viewed)
    }

    get count() {
        return this._count
    }

    get word() {
        return this.id
    }

    decrement() {
        this._count = 0
        this.view()
        this.doModified();
        return this._count;
    }

    increment() {
        this._count += 1;
        this.view()
        this.doModified();
        return this._count;
    }

    view() {
        this._viewed = new Date()
    }

    clone() {
        const newScore = new Score(this.word, this.count, this.viewed);
        return newScore;
    }

    toObject(propList = ['count', 'viewed']) {
        return super.toObject(propList)
    }
}