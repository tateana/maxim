/* eslint no-underscore-dangle: 0 */  // --> OFF
import pick from 'lodash.pick';

export default class Entity {

    static _entityType = 'none'

    constructor(id) {
        this._id = id
        this._isModified = false;
    }

    static get entityType() {
        return this.prototype.constructor._entityType;
    }

    get id() {
        return this._id
    }

    static dateToString(date) {
        if (date === null)
            return ''
        return date.toLocaleString()
    }

    get isModified() {
        return this._isModified
    }

    doModified() {
        this._isModified = true
    }

    synced() {
        this._isModified = false
        return this;
    }

    view() {
        this._viewed = new Date()
    }

    toObject(propList = ['id']) {
        return pick(this, propList)
    }
}