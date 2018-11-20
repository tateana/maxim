/* eslint no-underscore-dangle: 0 */  // --> OFF
import Entity from './Entity'

export default class Word extends Entity {

    static _entityType = 'word'

    constructor(id, ruOptions = null, ru = null, created = null) {
        super(id)
        this._ruOptions = ruOptions
        this._ru = ru || ruOptions[0]
        this._created = created || new Date()
    }

    get created() {
        return this._created
    }

    get origin() {
        return this.id
    }

    get de() {
        return this.id
    }

    get ru() {
        return this._ru
    }

    get translates() {
        return this._ruOptions || [this._ru]
    }

    get translate() {
        return this._ru
    }

    set translate(value) {
        this._ru = value
    }

    get isWritable() {
        return this._ruOptions && this._ruOptions.length > 0
    }
}