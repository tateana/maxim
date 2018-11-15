/* eslint no-underscore-dangle: 0 */  // --> OFF


export default class Noun {

    static _entityType = 'word'

    static genders = {
        'm': 'der',
        'f': 'die',
        'n': 'das'
    }

    constructor(de, ruOptions = null, gender, ru = null) {
        this._de = de

        this._ruOptions = ruOptions
        this._ru = ru || ruOptions[0]
        this._gender = gender
        this._isModified = false;
    }

    static get entityType() {
        return Noun._entityType;
    }

    get id() {
        return this._de
    }

    get created() {
        if (!this._created) {
            this._created = new Date()
        }

        return this._created
    }

    get origin() {
        return this._de
    }

    get de() {
        return this._de
    }

    get ru() {
        return this._ru
    }

    get gender() {
        return this._gender
    }

    get literalGender() {
        return Noun.genders[this._gender]
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

    set gender(value) {
        this._gender = value
    }

    get isWritable() {
        return this._ruOptions && this._ruOptions.length > 0
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

}